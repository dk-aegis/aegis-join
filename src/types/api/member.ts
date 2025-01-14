export enum Gender {
  male = "MALE",
  female = "FEMALE",
}

export enum Department {
  soft = "SOFTWARE_ENGINEERING",
  computer = "COMPUTER_ENGINEERING",
  mobile = "MOBILE_SYSTEM_ENGINEERING",
  datascience = "STATISTICS_DATA_SCIENCE",
  cyber = "CYBER_SECURITY",
  converge = "SW_CONVERGENCE_DIVISION",
}

export enum AcademicStatus {
  enroll = "ENROLLED",
  off = "LEAVE_OF_ABSENCE",
  graduate = "GRADUATED",
}

export enum Grade {
  one = "ONE",
  two = "TWO",
  three = "THREE",
  four = "FOUR",
  five = "FIVE",
  six = "SIX",
}

export enum Semester {
  first = "FIRST",
  second = "SECOND",
}

export enum Role {
  guest = "ROLE_GUEST",
  user = "ROLE_USER",
  admin = "ROLE_ADMIN",
}

export interface Member {
  birth_date: Date;
  gender: Gender;
  student_id: string;
  phone_number: string;
  department: Department;
  academic_status: AcademicStatus;
  grade: Grade;
  semester: Semester;
}

export interface GetMemberResponse extends Member {
  // GET /member
  id: number;
  email: string;
  name: string;
}

export interface CreateMemberRequest extends Member {
  // POST /member
}
