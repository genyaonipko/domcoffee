import Fixture from './PortionsServiceFixture';
import Service from './PortionsServiceImpl';
import Config from '../../Config';

export default Config.useFixtures ? new Fixture() : new Service();