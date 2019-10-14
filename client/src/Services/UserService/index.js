import Fixture from './UserServiceFixture';
import Service from './UserServiceImpl';
import Config from '../../Config';

export default Config.useFixtures ? new Fixture() : new Service();