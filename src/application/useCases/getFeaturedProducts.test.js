import { getFeaturedProducts } from './getFeaturedProducts';

describe('getFeaturedProducts', () => {
  it('returns featured products from repository', () => {
    const repository = {
      getFeaturedProducts: jest.fn(() => [{ id: 'p1' }, { id: 'p2' }])
    };

    const result = getFeaturedProducts(repository);

    expect(repository.getFeaturedProducts).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 'p1' }, { id: 'p2' }]);
  });
});
