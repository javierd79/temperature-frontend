import { Group, Loader, MantineColor, MantineSize, Text } from "@mantine/core";

interface ILoading {
  message?: string;
  fullWidth?: boolean;
  show?: boolean;
  size?: number | MantineSize | (string & {})
  color?: MantineColor;
  type?: 'bars' | 'dots'
}

function Loading({
  message,
  type,
  color,
  size,
  show = false,
  fullWidth = false
}: ILoading) {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', height: fullWidth ? '100vh' : 'auto', display: show ? 'block' : 'none' }}>
      <Group w="100%" h="100%" justify="center" align="center">
        <Loader
          type={type}
          color={color}
          size={size}
        />
        <Text mt={-2} fz={size} fw={350}>
          {message}
        </Text>
      </Group>
    </div>
  )
}

export default Loading