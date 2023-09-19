
import { expect, test} from 'vitest'
import { generateRandomString, isValidUrl } from "@/helper";

test('generate a random string with length of 6', () => {
    const code = generateRandomString()
    expect(code).toBeTypeOf('string')
})
