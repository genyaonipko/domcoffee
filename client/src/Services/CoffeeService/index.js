import Fixture from './CoffeeServiceFixture';
import Service from './CoffeeServiceImpl';
import Config from '../../Config';

export default Config.useFixtures ? new Fixture() : new Service();