import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helper/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountConnection = await MongoHelper.getCollection('accounts')
    const result = await accountConnection.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountConnection = await MongoHelper.getCollection('accounts')
    const account = await accountConnection.findOne({ email })

    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountConnection = await MongoHelper.getCollection('accounts')
    await accountConnection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
