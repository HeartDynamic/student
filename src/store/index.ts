import { userStore, IUserStore } from './user'
import { mainStore, IMainStore } from './main'
import { answerStore, IAnswerStore } from './answer'
import { submitStore, ISubmitStore } from './submit'
import { entryStore, IEntryStore } from './entry'
import { completeStore, ICompleteStore } from './complete'
import { classTableStore, IClassTableStore } from './classTable'

export interface IStore {
    userStore: IUserStore
    mainStore: IMainStore
    answerStore: IAnswerStore
    submitStore: ISubmitStore
    entryStore: IEntryStore
    completeStore: ICompleteStore
    classTableStore: IClassTableStore
}

export const store: IStore = {
    userStore,
    mainStore,
    answerStore,
    submitStore,
    entryStore,
    completeStore,
    classTableStore,
}
