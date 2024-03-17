import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from 'firebase-functions/logger';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import axios from 'axios';
import { transformIndicators } from '../utils/transformIndicators';

const collector = async (event: any = {}): Promise<any> => {
  try {
    const response = await axios(process.env.SOURCE_URL!, {
      auth: {
        username: process.env.USERNAMEAPI!,
        password: process.env.PASSWORDAPI!,
      },
    });

    const data = response.data;
    const id = uuidv4();

    await db
      .collection('horiba')
      .doc(`${id}`)
      .set({
        ...transformIndicators(data),
        date: Date.now(),
      });

    logger.info('The data has been collected and sent successfully.', {
      structuredData: true,
    });
  } catch (error) {
    logger.error(`Error during the data collecting:, ${error}`, {
      structuredData: true,
    });
  }
};

export const scheduledCollector = onSchedule("0 * * * *", async () => {
  await collector()
});
