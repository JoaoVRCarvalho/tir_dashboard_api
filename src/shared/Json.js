import jsonfile from 'jsonfile';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

class Json {
  create(obj) {
    const path = process.env.PATH_SERVER;

    const uuid = uuidv4();
    const { TESTSUITE, TESTCASE, USRNAME } = obj;
    const nameFile = `${TESTSUITE}_${TESTCASE}_${USRNAME}_${uuid}.json`;

    jsonfile.writeFile(path + nameFile, obj, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });
  }
}
export default new Json();
