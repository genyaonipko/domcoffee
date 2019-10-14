import Fixture from './AuthServiceFixture';
import Service from './AuthServiceImpl';
import Config from '../../Config';

export default Config.useFixtures ? new Fixture() : new Service();