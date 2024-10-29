import { AddressFormatterPipe } from './address-formatter.pipe';

describe('AddressFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new AddressFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
