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

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get role() {
    return this.props.role;
  }

  public set role(role: string) {
    this.props.role = role;
  }
}
