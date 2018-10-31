import { createFormData } from './ApiModule';

describe('ApiModule', () => {
  describe('createFormData should', () => {
    it('map options into FormData instance', () => {
      const data = createFormData({ url: 'url' });
      expect(data).toBeInstanceOf(FormData);
      expect(data.get('url')).toBe('url');
    });
  });
});
