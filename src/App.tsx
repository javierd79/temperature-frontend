import { AppShell, Group, Title, Burger, Text, Card, AccordionChevron, Grid } from "@mantine/core"
import Navbar from "./components/Navbar"
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/es'
import Loading from "./components/Loading";
import CardConnection from "./components/CardConnection";
import CardLastConnection from "./components/CardLastConnection";
import TemperatureCard from "./components/TemperatureCard";
import HumidityCard from "./components/HumidityCard";

interface IMain {
  title?: string;
  children?: ReactNode;
}

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [currentDay, setCurrentDay] = useState<string>(moment().format('DD/MM/YYYY'));
  const [minDate, setMinDate] = useState<string>(moment().subtract(1, 'week').format('DD/MM/YYYY'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [])

  const formatDay = (date: string) => {
    return moment(date, 'DD/MM/YYYY').format('DD')
  }

  const updateDay = (action: 'up' | 'down') => {
    const newDate = moment(currentDay, 'DD/MM/YYYY').add(action === 'up' ? 1 : -1, 'days').format('DD/MM/YYYY');

    if (moment(newDate, 'DD/MM/YYYY').isAfter(moment(), 'day')) {
      return;
    }

    if (moment(newDate, 'DD/MM/YYYY').isBefore(moment(minDate, 'DD/MM/YYYY'), 'day')) {
      return;
    }

    setCurrentDay(newDate);
  }

  const UpButtom = () => {
    return (
      <AccordionChevron
        size={40}
        className="chevron__up"
        onClick={() => updateDay('up')}
      />
    )
  }

  const DownButtom = () => {
    return (
      <AccordionChevron
        size={40}
        className="chevron__down"
        onClick={() => updateDay('down')}
      />
    )
  }

  const Headers = () => {
    return (
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={4} style={{ margin: 0 }}>
            Aplicación de monitoreo del clima
          </Title>
        </Group>
      </AppShell.Header>
    )
  }

  const Main = ({ title, children }: IMain) => {
    return (
      <AppShell.Main>
        <Text
          mb={10}
          fz={16}
          fw={700}
        >
          {title}
        </Text>
        {children}
      </AppShell.Main>
    )
  }

  return (
    <>
      <Loading message="Cargando datos..." fullWidth={true} size="lg" show={isLoading} type="dots" />
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        style={{
          display: isLoading ? 'none' : 'block'
        }}
      >
        <Headers />
        <Navbar />
        <Main>
          <Card className="calendar">
            <Text fz={20} c="white" fw={600} mt={-10} mb={10}>
              Temperatura y humedad
            </Text>
            <Group w="100%" justify="space-between">
              <div className="calendar__day">
                <UpButtom />
                <Text fz={75} c="white" mt={-10} p={0} style={{ userSelect: 'none' }}>
                  {formatDay(currentDay)}<br /><Text ta="center" fw={300} mt={-25} fz={20}>{moment(currentDay, 'DD/MM/YYYY').format('MMMM')}</Text>
                </Text>
                <DownButtom />
              </div>
              <div className="calendar__stats">
                <div className="card__stats">
                  <Text ta="start" fw={750} fz={20} c="white" px={10}>
                    Temperatura:
                  </Text>
                  <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                    39°C ± 2°C
                  </Text>
                  <Text ta="start" fw={750} fz={20} c="white" px={10}>
                    Sensación térmica:
                  </Text>
                  <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                    41°C ± 2°C
                  </Text>
                  <Text ta="start" fw={750} fz={20} c="white" px={10}>
                    Humedad:
                  </Text>
                  <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                    40% ± 2%
                  </Text>
                  <Text ta="start" fw={750} fz={20} c="white" px={10}>
                    Polling:
                  </Text>
                  <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                    15 minutos
                  </Text>
                </div>
              </div>
            </Group>
          </Card>

          <Card mt={10} className="calendar">
            <Text fz={20} c="white" fw={600} mt={-10} mb={10}>
              Estadísticas del día
            </Text>
            <div className="calendar__status">
              <Grid h="100%">
                <Grid.Col span={6}>
                  <CardConnection />
                </Grid.Col>
                <Grid.Col span={6}>
                  <CardLastConnection />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TemperatureCard />
                </Grid.Col>
                <Grid.Col span={6}>
                  <HumidityCard />
                </Grid.Col>
              </Grid>
            </div>
          </Card>
        </Main>
      </AppShell>
    </>
  )
}

export default App
