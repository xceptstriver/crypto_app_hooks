import {STATE_STATUS} from '../constants';
import {MARKET_ACTIONS} from '../constants/market';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  coins: [
    // {
    //   id: 'bitcoin',
    //   symbol: 'btc',
    //   name: 'Bitcoin',
    //   image:
    //     'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    //   current_price: 47290,
    //   market_cap: 889132197002,
    //   market_cap_rank: 1,
    //   fully_diluted_valuation: 993014889181,
    //   total_volume: 36244299391,
    //   high_24h: 48257,
    //   low_24h: 46659,
    //   price_change_24h: -61.329407307647,
    //   price_change_percentage_24h: -0.12952,
    //   market_cap_change_24h: -1533969185.2366943,
    //   market_cap_change_percentage_24h: -0.17223,
    //   circulating_supply: 18803118,
    //   total_supply: 21000000,
    //   max_supply: 21000000,
    //   ath: 64805,
    //   ath_change_percentage: -27.01631,
    //   ath_date: '2021-04-14T11:54:46.763Z',
    //   atl: 67.81,
    //   atl_change_percentage: 69650.14378,
    //   atl_date: '2013-07-06T00:00:00.000Z',
    //   roi: null,
    //   last_updated: '2021-09-01T04:22:17.582Z',
    //   sparkline_in_7d: {
    //     price: [
    //       47804.61764289795, 48197.91989425804, 48080.95723812365,
    //       48288.077599573124, 48140.33199367938, 48118.13356204849,
    //       48569.681773422955, 48407.885932065044, 48220.09639014465,
    //       47355.7647949307, 47250.111254103365, 47564.82143630801,
    //       47595.64282354106, 47880.485505624325, 47823.89017104759,
    //       48494.59325882068, 48742.858467490885, 48714.41853890469,
    //       48995.85465047788, 48922.70542590135, 48753.76857658705,
    //       48701.72190282694, 48942.76918213867, 48876.827163679605,
    //       48989.51208406698, 49320.14321163297, 48852.47841611081,
    //       48720.91695101708, 47962.34759334175, 47852.61135414922,
    //       46999.6507077132, 46991.39034969912, 47055.6892990653,
    //       47068.410382617316, 46913.03804634985, 47113.073643525844,
    //       46923.88439113699, 47136.79287881744, 47272.18225275718,
    //       46940.88146695009, 46774.49683027515, 47089.195167122445,
    //       47015.74392510276, 47054.290916360056, 47011.30077221907,
    //       47053.08077965859, 47259.78380587704, 47254.51091325571,
    //       47229.070650876114, 47004.53470834667, 47472.21957412567,
    //       47322.012064267525, 46840.06298900606, 46929.075765878406,
    //       47171.69068780377, 47163.12097253866, 47472.32259810103,
    //       47308.148878540385, 47297.11345494278, 47444.04969762732,
    //       47634.99529350559, 47485.315891054765, 47245.4817913387,
    //       48365.08188835269, 48283.6067430317, 48340.46547101162,
    //       48282.857096604464, 48402.894403697246, 48395.33344545127,
    //       49054.97152111156, 49054.78356013059, 49060.62130396257,
    //       49083.10330586219, 49333.34480364259, 49176.26868835636,
    //       48986.0202051215, 48934.600268310875, 49006.013159532085,
    //       48957.86715901772, 49037.09841849919, 48956.506457988275,
    //       48903.919154529285, 48974.62212687912, 48931.528321970654,
    //       48796.04175254504, 48973.7385955292, 48781.60900734666,
    //       48552.27655211006, 48804.79343405096, 49035.14611313992,
    //       49055.93329551273, 48926.73243044487, 48683.963214892254,
    //       48778.8714262788, 48996.125473418884, 48783.27933383109,
    //       48936.537254142204, 49639.709722786334, 49322.9719342963,
    //       48803.46406951842, 48346.04339682749, 48259.328881032605,
    //       48414.372379366905, 48508.22366541794, 48563.95628328289,
    //       48545.05578440237, 48619.44126712716, 48689.59070634452,
    //       48285.519947309476, 48483.17553347258, 48426.38907819105,
    //       48456.120568308805, 48560.43156879118, 48736.61400678661,
    //       48828.03918043832, 48786.56795012953, 48837.541539946455,
    //       48940.611915975365, 48832.243575592816, 49074.76894761112,
    //       48907.27073106221, 48462.60310241467, 48548.79319762094,
    //       48525.240024884784, 48026.034347933244, 47953.259937471965,
    //       48107.64457684877, 48121.48262525768, 48011.6987315548,
    //       48216.571980660876, 48029.36649321177, 48208.080251229585,
    //       47962.51635246094, 47795.77428665798, 47924.22434282652,
    //       47870.295980088726, 48162.73907474525, 48233.42978910172,
    //       48239.72152244159, 48585.84412186152, 48594.478086814604,
    //       48671.97561101671, 48446.23727916206, 47673.679984058545,
    //       47673.679984058545, 47124.25422469402, 46968.369600878425,
    //       46992.400445306164, 47081.6315759742, 47291.2144835944,
    //       47235.73366342894, 47271.53668605956, 47095.25664052953,
    //       47854.548464213825, 47813.26826748509, 47547.06075154675,
    //       47559.88490854393, 47962.482825036095, 47859.736199177365,
    //       47918.29178077517, 47417.451994884126, 47472.56120557331,
    //       47398.029427556474, 47201.146903996, 47368.77109638813,
    //       47358.084037956185, 47086.03200493119, 47117.14121104799,
    //       47214.46733785828,
    //     ],
    //   },
    //   price_change_percentage_7d_in_currency: -1.3562624562130006,
    // },
  ],
};

export const marketReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case MARKET_ACTIONS.FETCH_MARKET:
      if (payload.params.page === 1) {
        return {
          ...state,
          status: STATE_STATUS.FETCHING,
          coins: [],
          params: payload.params,
        };
      }
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
        params: payload.params,
      };
    case MARKET_ACTIONS.FETCHED_MARKET:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        coins: [...state['coins'], ...payload.coins],
      };
    case MARKET_ACTIONS.FAILED_FETCH_MARKET:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        error,
      };
    default:
      return state;
  }
};
