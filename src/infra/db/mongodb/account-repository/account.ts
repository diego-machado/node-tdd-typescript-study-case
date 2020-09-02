import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountConnection = MongoHelper.getConnection('accounts')
    const result = await accountConnection.insertOne(accountData)

    const account = result.ops[0]
    const { _id, ...accountWithoutId } = account

    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
