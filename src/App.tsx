import { AppShell, Group, Title, Burger, Text, Card, AccordionChevron, Grid, SimpleGrid, Divider, ScrollArea } from "@mantine/core"
import Navbar from "./components/Navbar"
import { useDisclosure } from "@mantine/hooks";
import React, { ReactNode, useEffect, useState } from "react";
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
interface Archive {
  id: number;
  current: string;
  device_token: string;
  created_at: string;
  updated_at: string;
}

interface Log {
  id: number;
  temperature: number;
  humidity: number;
  thermal_sensation: number;
  degree: string;
  archive_id: number;
  device_id: number;
  created_at: string;
  updated_at: string;
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
  const [archives, setArchives] = useState<Archive[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>('2024-04-03');

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await fetch('https://apitemp.rifa-max.com/archives');
        const jsonData = await response.json();
        setArchives(jsonData);
      } catch (error) {
        console.error('Error fetching archives:', error);
      }
    };

    const fetchLogs = async () => {
      try {
        const response = await fetch('https://apitemp.rifa-max.com/logs');
        const jsonData = await response.json();
        setLogs(jsonData);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchArchives();
    fetchLogs();
  }, []);

  const getFirstLogByDate = (date: string) => {
    const logsForDate = logs.filter(log => log.created_at.includes(date));
    return logsForDate.length > 0 ? logsForDate[0] : null;
  };

  const getLogsByDate = (date: string) => {
    const logsForDate = logs.filter(log => log.created_at.includes(date));
    return logsForDate.length > 0 ? [logsForDate[0]] : [];
  };

  const handleCardClick = (date: string) => {
    console.log('Fecha seleccionada:', date);
    setSelectedDate(date);
  };
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
        <AppShell.Navbar p="md">
          <Text mb={10} fz={16} fw={700}>
            Promedio global de clima
          </Text>
          <ScrollArea h="100%" scrollbarSize={0}>
            {archives.map((archive, index) => {
              const firstLog = getFirstLogByDate(archive.current);
              return (
                <Card
                  key={index}
                  mb={10}
                  p={0}
                  style={{
                    background: "#1F1F1F",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(archive.current)}
                >
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ background: '#1971C2', border: '1px solid #1971C2', borderRadius: '5px 0 5px 0', width: '30%', height: 30 }}>
                      <Text ta="center" fz={14} mt={3} fw={300}>{archive.current}</Text>
                    </div>
                    <div style={{ width: "70%" }}>
                      <Text ta="center" fz={14} mt={5} fw={600} style={{ textDecoration: "underline 2px #1971C2" }}>
                        Promedio del dia
                      </Text>
                    </div>
                  </div>
                  <Divider mt={10} variant='dashed' />
                  <SimpleGrid cols={2} mx={5} mb={10}>
                    {firstLog && (
                      <>
                        <Text ta="start" fz={14} mt={5} fw={600}>Sensación térmica:</Text>
                        <Text ta="end" fz={14} mt={5} fw={300}>{firstLog.thermal_sensation}°C</Text>
                        <Text ta="start" fz={14} mt={-15} fw={600}>Temperatura:</Text>
                        <Text ta="end" fz={14} mt={-15} fw={300}>{firstLog.temperature}°C</Text>
                        <Text ta="start" fz={14} mt={-15} fw={600}>Humedad:</Text>
                        <Text ta="end" fz={14} mt={-15} fw={300}>{firstLog.humidity}%</Text>
                      </>
                    )}
                  </SimpleGrid>
                </Card>
              );
            })}
          </ScrollArea>
        </AppShell.Navbar>
        <Main>
          <Card className="calendar">
            <Text fz={20} c="white" fw={600} mt={-10} mb={10}>
              Temperatura y humedad
            </Text>
            <Group w="100%" justify="space-between">
              {/* <div className="calendar__day">
                <UpButtom />
                <Text fz={75} c="white" mt={-10} p={0} style={{ userSelect: 'none' }}>
                  {formatDay(currentDay)}<br /><Text ta="center" fw={300} mt={-25} fz={20}>{moment(currentDay, 'DD/MM/YYYY').format('MMMM')}</Text>
                </Text>
                <DownButtom />
              </div> */}
              {selectedDate && (
                <div className="calendar__stats">
                  <div className="card__stats">
                    {getLogsByDate(selectedDate).map((log, idx) => (
                      <React.Fragment key={idx}>
                        <Text ta="start" fw={750} fz={20} c="white" px={10}>
                          Temperatura:
                        </Text>
                        <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                          {log.temperature}°C ± 2°C
                        </Text>
                        <Text ta="start" fw={750} fz={20} c="white" px={10}>
                          Sensación térmica:
                        </Text>
                        <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                          {log.thermal_sensation}°C ± 2°C
                        </Text>
                        <Text ta="start" fw={750} fz={20} c="white" px={10}>
                          Humedad:
                        </Text>
                        <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                          {log.humidity}% ± 2%
                        </Text>
                        <Text ta="start" fw={750} fz={20} c="white" px={10}>
                          Polling:
                        </Text>
                        <Text ta="start" fw={300} fz={20} c="white" mt={0} px={10}>
                          30 minutos
                        </Text>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
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
                  <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #6741d9' }} h="140px">
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
                </Grid.Col>
                <Grid.Col span={6}>


                  {selectedDate && (

                    <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #f08c00' }} h="140px">

                      {getLogsByDate(selectedDate).map((log, idx) => (
                        <React.Fragment key={idx}>

                          <Text ta="start" mt={-10} fz={17} fw={600} c="white">
                            Temperatura:
                          </Text>
                          <Text ta="start" c="white" fw={100} fz={14}>
                            Temperatura:   {log.temperature}°C ± 2°C
                          </Text>
                          <Text ta="start" c="white" fw={100} fz={14}>
                            Sensación térmica:  {log.thermal_sensation}°C 40°C ± 2°C
                          </Text>

                        </React.Fragment>
                      ))}
                    </Card>

                  )}

                </Grid.Col>
                <Grid.Col span={6}>
                  {selectedDate && (

                    <Card bg="rgb(31, 31, 31)" style={{ border: '2px solid #9c36b5' }} h="140px">

                      {getLogsByDate(selectedDate).map((log, idx) => (
                        <React.Fragment key={idx}>

                          <Text ta="start" mt={-10} fz={17} fw={600} c="white">
                            Humedad:
                          </Text>
                          <Text ta="start" c="white" fw={100} fz={14}>
                            {log.humidity}% ± 2%
                          </Text>
                        </React.Fragment>
                      ))}
                    </Card>

                  )}

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