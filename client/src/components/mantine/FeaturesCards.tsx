import { IconGauge, IconTools, IconCar } from '@tabler/icons-react';
import {
    Card,
    Container,
    SimpleGrid,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import classes from './FeaturesCards.module.css';
import LoginForm from '@/components/login/LoginForm';
import Contact from '@/pages/Contact';
import { GetInTouch } from './GetInTouch';

const mockdata = [
    {
        title: 'Fast Diagnostics',
        description:
            'Accurate fault detection using modern diagnostics tools to get your vehicle back on the road quickly and safely.',
        icon: IconGauge,
    },
    {
        title: 'Expert Technicians',
        description:
            'Certified mechanics with years of experience in repairs, maintenance and performance tuning for all makes and models.',
        icon: IconTools,
    },
    {
        title: 'Genuine Parts',
        description:
            'We fit high-quality genuine or OEM-equivalent parts and offer transparent recommendations to extend your vehicle life.',
        icon: IconCar,
    },
];

const FeaturesCards = () => {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon size={50} stroke={1.5} color={theme.colors.blue[6]} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Professional auto service you can rely on
            </Title>

            {/* <Group justify="center">
                <Badge variant="filled" size="lg">
                    Trusted Auto Repair
                </Badge>
            </Group> */}

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Full-service maintenance, urgent repairs and long-term care for cars, trucks and SUVs — handled by professionals.
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>

            <div style={{ marginTop: '50px' }}>
                <GetInTouch />

            </div>
        </Container>
    );
}

export default FeaturesCards