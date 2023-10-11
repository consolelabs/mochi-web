import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'gray',
        'mochi',
        'text',
        'pill',
      ],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'icon', 'icon-sm'],
      defaultValue: 'base',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}
