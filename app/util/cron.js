import cron from 'node-cron'
import * as storeHandler from '../handlers/store'
import * as vacationManager from '../manager/vacation'
const START_VACATION_CRON_INTERVAL = '0,10,20,30,40,50 * * * *'
const END_VACATION_CRON_INTERVAL = '5,15,25,35,45,55 * * * *'

const startVacationStartCheckJob = () => {
  cron.schedule(START_VACATION_CRON_INTERVAL, async function() {
    let users = await storeHandler.checkVacationStartToday()
    users.forEach((user, index) => {
      vacationManager.userStartVacation(user)
    })
  })
}

const startVacationEndCheckJob = () => {
  cron.schedule(END_VACATION_CRON_INTERVAL, async function() {
    let users = await storeHandler.checkVacationEndToday()
    users.forEach((user, index) => {
      vacationManager.userEndVacation(user)
    })
  })
}

export {
  startVacationStartCheckJob,
  startVacationEndCheckJob
}
