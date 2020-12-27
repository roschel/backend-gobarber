import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12121132231',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12121132231');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 11, 27, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '3333',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '3333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
