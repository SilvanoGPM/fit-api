import { BaseEntity } from './base-entity';

interface ExerciceVideo {
  male: string;
  female: string;
}

export interface ExerciceProps {
  name: string;
  muscle: string;
  mode: string;
  steps: string[];

  videos: ExerciceVideo;
}

export class Exercice extends BaseEntity {
  constructor(private props: ExerciceProps, id?: string) {
    super(id);
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get muscle() {
    return this.props.muscle;
  }

  public set muscle(muscle: string) {
    this.props.muscle = muscle;
  }

  public get mode() {
    return this.props.mode;
  }

  public set mode(mode: string) {
    this.props.mode = mode;
  }

  public get steps() {
    return this.props.steps;
  }

  public set steps(steps: string[]) {
    this.props.steps = steps;
  }

  public get videos() {
    return this.props.videos;
  }

  public set videos(videos: ExerciceVideo) {
    this.props.videos = videos;
  }

  toJSON() {
    return this.props;
  }
}
