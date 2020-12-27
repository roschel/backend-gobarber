import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppoimentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppoimentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
