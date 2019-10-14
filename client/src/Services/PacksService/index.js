import Fixture from './PacksServiceFixture';
import Service from './PacksServiceImpl';
import Config from '../../Config';

export default Config.useFixtures ? new Fixture() : new Service();