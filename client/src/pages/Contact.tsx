import { GetInTouch } from "@/components/mantine/GetInTouch"
import classes from '@/components/mantine/FeaturesCards.module.css'
import { Title, Text } from "@mantine/core"

const Contact = () => {
  return (
    <>
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

<div style ={{margin: "50px 0"}}>

</div>
      <GetInTouch />
    </>
  )
}

export default Contact