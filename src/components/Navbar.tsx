import { AppShell, Card, SimpleGrid, Text, Divider, ScrollArea } from '@mantine/core';

function Navbar() {
  return (
    <AppShell.Navbar p="md">
      <Text
        mb={10}
        fz={16}
        fw={700}
      >
        Promedio global de clima
      </Text>
      <ScrollArea h="100%" scrollbarSize={0}>
        {Array(18)
          .fill(0)
          .map((index) => (
            <Card
              key={index}
              mb={10}
              p={0}
              style={{
                background: "#1F1F1F",
                cursor: "pointer",
              }}
            >
              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}>
                <div
                  style={{
                    background: '#1971C2',
                    border: '1px solid #1971C2',
                    borderRadius: '5px 0 5px 0',
                    width: '30%',
                    height: 30
                  }}
                >
                  <Text ta="center" fz={14} mt={3} fw={300}>04/01/2023</Text>
                </div>
                <div style={{ width: "70%" }}>
                  <Text
                    ta="center"
                    fz={14}
                    mt={5}
                    fw={600}
                    style={{ textDecoration: "underline 2px #1971C2" }}
                  >
                    Promedio del dia
                  </Text>
                </div>
              </div>
              <Divider mt={10} variant='dashed' />
              <SimpleGrid cols={2} mx={5} mb={10}>
                <Text ta="start" fz={14} mt={5} fw={600}>Sensación térmica:</Text>
                <Text ta="end" fz={14} mt={5} fw={300}>41°C</Text>
                <Text ta="start" fz={14} mt={-15} fw={600}>Temperatura:</Text>
                < Text ta="end" fz={14} mt={-15} fw={300}>39°C ± 2°C</Text>
                < Text ta="start" fz={14} mt={-15} fw={600}>Humedad:</Text>
                <Text ta="end" fz={14} mt={-15} fw={300}>41% ± 2%</Text>
              </SimpleGrid>
            </Card>
          ))
        }
      </ScrollArea>
    </AppShell.Navbar>
  );
}

export default Navbar;