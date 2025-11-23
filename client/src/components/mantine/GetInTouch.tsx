import { Button, Group, Paper, SimpleGrid, Text, Textarea, TextInput } from '@mantine/core';
import { useState } from 'react';
import bg from './ContactBG.png';
import { ContactIconsList } from './ContactIcons';
import classes from './GetInTouch.module.css';
import { sendCustomerEmail } from '@/utils/api';
import { showErrorNotification, showSuccessNotification } from '@/utils/helpers';

export function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);


    try {
      sendCustomerEmail(formData);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      showSuccessNotification('Message sent successfully!');
    } catch (err) {
      console.error('Failed to send message:', err);
      showErrorNotification('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ backgroundImage: `url(${bg})` }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff" style={{marginBottom: '30px'}}>
            Contact information
          </Text>

          <ContactIconsList />
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Text fz="lg" fw={700} className={classes.title} style={{marginBottom: '30px'}}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Your name"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Your email"
                placeholder="info@opravauto.com"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              label="Subject"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              name="message"
              value={formData.message}
              onChange={handleChange}
              minRows={3}
              required
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control} loading={loading}>
                Send message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}