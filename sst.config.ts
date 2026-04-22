// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "note",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        cloudflare: { package: "@pulumi/cloudflare", version: "6.14.0" },
      },
    };
  },
  async run() {
    // VPCを作成
    const vpc = new sst.aws.Vpc("AppVpc", {
      bastion: true,
      transform: {
        bastionInstance: (args) => {
          args.instanceType = "t4g.micro";
        },
      },
      // GoogleOAuthとかでVPC経由で外に出なきゃいけないからオンにする。クレジット注意
      nat: "managed"
    })

    // DBを作成
    const db = new sst.aws.Postgres("AppDb", {
      vpc,
      dev: {
        host: "127.0.0.1",
        port: 5432,
        username: "postgres",
        password: "prisma",
        database: "postgres",
      },
      transform: {
        instance: (args) => {
          // 自動バックアップの保持日数がFree Planの制限に引っかかる（デフォルト: 7）
          args.backupRetentionPeriod = 0;
        },
      },
    })

    // 作成したDBからDATABASE_URLを作成
    const DATABASE_URL =$interpolate`postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}?schema=public`;

    // Next.jsアプリを定義
    new sst.aws.Nextjs("MyWeb", {
      vpc,
      link: [db],
      environment: {
        DATABASE_URL: DATABASE_URL,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
        CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN!,
        CLOUDFLARE_DEFAULT_ACCOUNT_ID: process.env.CLOUDFLARE_DEFAULT_ACCOUNT_ID!,
      },
      domain: {
        name: `${$app.stage}.note.negisosu.com`,
        dns: sst.cloudflare.dns(),
      },
    });
  },
});
