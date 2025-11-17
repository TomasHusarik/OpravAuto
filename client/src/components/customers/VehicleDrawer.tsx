import { Vehicle } from '@/types/Vehicle';
import { addVehicle, updateVehicle } from '@/utils/api';
import { Button, Drawer, Grid, TextInput, Title, Select, NumberInput, Textarea } from '@mantine/core';
import { IconDeviceFloppy, IconCar, Icon123, IconPalette, IconEngine, IconRoad, IconPin } from '@tabler/icons-react';
import em from '@/utils/errorMessages';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

interface IVehicleDrawer {
	vehicleDrawer: boolean;
	vehicle?: Vehicle;
	setVehicle: (vehicle: Vehicle | undefined) => void;
	setVehicleDrawer: (value: boolean) => void;
	onSaveSuccess?: () => void;
	ownerId?: string;
}

const VehicleDrawer = (props: IVehicleDrawer) => {
	const { vehicle, vehicleDrawer, setVehicleDrawer, onSaveSuccess, ownerId } = props;
	const [isSaving, setIsSaving] = useState(false);

	const form = useForm({
		initialValues: {
			_id: vehicle?._id,
			make: vehicle?.make || '',
			model: vehicle?.model || '',
			year: vehicle?.year || new Date().getFullYear(),
			vin: vehicle?.vin || '',
			color: vehicle?.color || '',
			mileage: vehicle?.mileage || 0,
			engineType: vehicle?.engineType || 'Gasoline',
			transmission: vehicle?.transmission || 'Manual',
			notes: vehicle?.notes || '',
			owner: vehicle?.owner || ownerId || '',
		},
		validate: {
			make: (val: string) => (val?.trim() ? null : em.mandatoryField),
			model: (val: string) => (val?.trim() ? null : em.mandatoryField),
			year: (val: number) => (val && val > 1900 ? null : em.mandatoryField),
			vin: (val: string) => (val?.trim() ? null : em.mandatoryField),
			owner: (val: string) => (val?.trim() ? null : em.mandatoryField),
		},
	});

	useEffect(() => {
		form.setValues({
			_id: vehicle?._id,
			make: vehicle?.make || '',
			model: vehicle?.model || '',
			year: vehicle?.year || new Date().getFullYear(),
			vin: vehicle?.vin || '',
			color: vehicle?.color || '',
			mileage: vehicle?.mileage || 0,
			engineType: vehicle?.engineType || 'Gasoline',
			transmission: vehicle?.transmission || 'Manual',
			notes: vehicle?.notes || '',
			owner: vehicle?.owner || ownerId || '',
		});
	}, [vehicle, ownerId]);

	const handleSave = async (values: typeof form.values) => {
		setIsSaving(true);
		try {
			if (values._id) {
				await updateVehicle(values);
			} else {
				await addVehicle(values);
			}
			setVehicleDrawer(false);
			onSaveSuccess?.();
		} catch (error) {
			console.error('Error saving vehicle:', error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Drawer
			opened={vehicleDrawer}
			onClose={() => { setVehicleDrawer(false); }}
			position='right'
			size={"lg"}
		>
			<form onSubmit={form.onSubmit((values) => handleSave(values))}>
				<Grid px={20}>
					<Grid.Col span={12}>
						<Title order={1} c="var(--mantine-color-blue-light-color)">{vehicle?._id ? `Edit Vehicle` : 'Add New Vehicle'}</Title>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Make"
							placeholder="Make"
							leftSection={<IconCar size={16} />}
							radius="md"
							size="md"
							name="make"
							required
							value={form.values.make}
							onChange={(e) => form.setFieldValue('make', e.currentTarget.value)}
							error={form.errors.make}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Model"
							placeholder="Model"
							leftSection={<IconCar size={16} />}
							radius="md"
							size="md"
							name="model"
							required
							value={form.values.model}
							onChange={(e) => form.setFieldValue('model', e.currentTarget.value)}
							error={form.errors.model}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<NumberInput
							label="Year"
							placeholder="Year"
							leftSection={<Icon123 size={16} />}
							radius="md"
							size="md"
							name="year"
							required
							value={form.values.year}
							onChange={(value) => form.setFieldValue('year', value as number)}
							error={form.errors.year}
							min={1900}
							max={new Date().getFullYear() + 1}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="VIN"
							placeholder="VIN"
							leftSection={<IconPin size={16} />}
							radius="md"
							size="md"
							name="vin"
							required
							value={form.values.vin}
							onChange={(e) => form.setFieldValue('vin', e.currentTarget.value)}
							error={form.errors.vin}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Color"
							placeholder="Color"
							leftSection={<IconPalette size={16} />}
							radius="md"
							size="md"
							name="color"
							value={form.values.color}
							onChange={(e) => form.setFieldValue('color', e.currentTarget.value)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<NumberInput
							label="Mileage (km)"
							placeholder="Mileage"
							leftSection={<IconRoad size={16} />}
							radius="md"
							size="md"
							name="mileage"
							value={form.values.mileage}
							onChange={(value) => form.setFieldValue('mileage', value as number)}
							min={0}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Select
							label="Engine Type"
							placeholder="Engine Type"
							data={["Gasoline", "Diesel", "Electric", "Hybrid", "Other"]}
							leftSection={<IconEngine size={16} />}
							radius="md"
							size="md"
							name="engineType"
							value={form.values.engineType}
							onChange={(value) => form.setFieldValue('engineType', (value ?? '') as Vehicle["engineType"])}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Select
							label="Transmission"
							placeholder="Transmission"
							data={["Manual", "Automatic", "CVT", "Other"]}
							radius="md"
							size="md"
							name="transmission"
							value={form.values.transmission}
							onChange={(value) => form.setFieldValue('transmission', (value ?? '') as Vehicle["transmission"])}
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Textarea
							label="Notes"
							placeholder="Notes"
							radius="md"
							size="md"
							name="notes"
							value={form.values.notes}
							onChange={(e) => form.setFieldValue('notes', e.currentTarget.value)}
						/>
					</Grid.Col>
					<Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							type="submit"
							variant="filled"
							radius="md"
							loading={isSaving}
							leftSection={<IconDeviceFloppy stroke={1.5} size={20} color="white" />}
						>
							Save
						</Button>
					</Grid.Col>
				</Grid>
			</form>
		</Drawer>
	);
};

export default VehicleDrawer;
