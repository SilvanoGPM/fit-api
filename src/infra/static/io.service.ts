import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

export interface GeneralIO {
  path: string;
  encoding?: 'utf-8';
}

interface WriteIO extends GeneralIO {
  data: any;
}

@Injectable()
export class IoService {
  async read<T>({ path, encoding = 'utf-8' }: GeneralIO) {
    try {
      const data = await fs.readFile(path, { encoding });

      if (!data) {
        return null;
      }

      return JSON.parse(data) as T;
    } catch {
      throw Error(`Error on read: "${path}"`);
    }
  }

  async write({ path, data, encoding = 'utf-8' }: WriteIO) {
    try {
      await fs.writeFile(path, JSON.stringify(data, null, 2), { encoding });
    } catch {
      throw Error(`Error on write: "${path}"`);
    }
  }

  async update({ path, data, encoding = 'utf-8' }: WriteIO) {
    try {
      const oldData = await this.read<any>({ path, encoding });

      const newData = { ...oldData, ...data };

      await this.write({ path, encoding, data: newData });
    } catch {
      throw Error(`Error on update: "${path}"`);
    }
  }
}
