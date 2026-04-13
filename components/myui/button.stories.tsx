import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { ArrowRight } from 'lucide-react';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "ボタン"
  }
};

export const Outline: Story = {
  args: {
    children: "ボタン",
    variant: "outline"
  }
}

export const Destructive: Story = {
  args: {
    children: "ボタン",
    variant: "destructive"
  }
}

export const Ghost: Story = {
  args: {
    children: "ボタン",
    variant: "ghost"
  }
}

export const Link: Story = {
  args: {
    children: "ボタン",
    variant: "link"
  }
}

export const Secondary: Story = {
  args: {
    children: "ボタン",
    variant: "secondary"
  }
}

export const StartIcon: Story = {
  args: {
    children: "ボタン",
    startIcon: ArrowRight
  }
}

export const EndIcon: Story = {
  args: {
    children: "ボタン",
    endIcon: ArrowRight,
  }
}

export const Loading: Story = {
  args: {
    children: "ボタン",
    loading: true
  }
}