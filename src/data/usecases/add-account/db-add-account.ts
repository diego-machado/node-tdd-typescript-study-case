import { AddAccount, Hasher, AddAccountModel, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (!account) {
      const hasedPassword = await this.hasher.hash(accountData.password)

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hasedPassword })
      )

      return newAccount
    }

    return null
  }
}
