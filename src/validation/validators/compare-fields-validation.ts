import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldtoCompareName: string
  ) { }

  validate (input: any): Error {
    console.log(input)
    if (input[this.fieldName] !== input[this.fieldtoCompareName]) {
      return new InvalidParamError(this.fieldtoCompareName)
    }
  }
}
