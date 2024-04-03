import { Card, Divider, Group, Text } from "@mantine/core"

function CardLastConnection() {
  return (
    <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #6741d9'}} h="140px">
      <Text ta="start" mt={-10} fz={17} fw={600} c="white">
        Última actualizaciones:
      </Text>
      <Group justify="space-between">
        <Text ta="start" fz={14}>
          Última conexión:
        </Text>
        <Text ta="center" fz={14}>
          A las 12:00 AM
        </Text>
      </Group>
    </Card>
  )
}

export default CardLastConnection