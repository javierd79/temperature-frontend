import { Card, Text } from "@mantine/core"

function HumidityCard() {
  return (
    <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #9c36b5' }} h="140px">
      <Text ta="start" mt={-10} fz={17} fw={600} c="white">
        Humedad:
      </Text>
      <Text ta="start" c="white" fw={100} fz={14}>
        Humedad: 39% ± 2%
      </Text>
    </Card>
  )
}

export default HumidityCard;