import { BaseEntity, BaseEntityProps } from './base-entity';

export interface UserProps {
  name: string;
  email: string;
  role: string;
}

export type CreateUserProps = UserProps & BaseEntityProps;

export class User extends BaseEntity<UserProps> {
  constructor({ id, createdAt, updatedAt, ...props }: CreateUserProps) {
    super({ id, createdAt, updatedAt });

    this.props = props;
  }

  private get name() {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  private get email() {
    return this.props.email;
  }

  private set email(email: string) {
    this.props.email = email;
  }

  private get role() {
    return this.props.role;
  }

  private set role(role: string) {
    this.props.role = role;
  }
}
