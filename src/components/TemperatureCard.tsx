import { Card, Text } from "@mantine/core"

function TemperatureCard() {
  return (
    <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #f08c00' }} h="140px">
      <Text ta="start" mt={-10} fz={17} fw={600} c="white">
        Temperatura:
      </Text>
      <Text ta="start" c="white" fw={100} fz={14}>
        Temperatura: 39°C ± 2°C
      </Text>
      <Text ta="start" c="white" fw={100} fz={14}>
        Sensación térmica: 40°C ± 2°C
      </Text>
    </Card>
  )
}

export default TemperatureCard