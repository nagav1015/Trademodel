export interface TradeSymbol {
  name: string;
  ticker: string;
  type: 'Index' | 'Stock' | 'Crypto';
  sector?: string;
  exchange: 'NSE' | 'BSE' | 'Binance';
}

export const MASTER_SYMBOLS: TradeSymbol[] = [
  {
    "name": "Nifty 50",
    "ticker": "^NSEI",
    "type": "Index",
    "sector": "Market",
    "exchange": "NSE"
  },
  {
    "name": "Bank Nifty",
    "ticker": "^NSEBANK",
    "type": "Index",
    "sector": "Financials",
    "exchange": "NSE"
  },
  {
    "name": "360 ONE WAM Ltd.",
    "ticker": "360ONE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "3M India Ltd.",
    "ticker": "3MINDIA.NS",
    "type": "Stock",
    "sector": "Diversified",
    "exchange": "NSE"
  },
  {
    "name": "ABB India Ltd.",
    "ticker": "ABB.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "ACC Ltd.",
    "ticker": "ACC.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "ACME Solar Holdings Ltd.",
    "ticker": "ACMESOLAR.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "AIA Engineering Ltd.",
    "ticker": "AIAENG.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "APL Apollo Tubes Ltd.",
    "ticker": "APLAPOLLO.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "AU Small Finance Bank Ltd.",
    "ticker": "AUBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "AWL Agri Business Ltd.",
    "ticker": "AWL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Aadhar Housing Finance Ltd.",
    "ticker": "AADHARHFC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Aarti Industries Ltd.",
    "ticker": "AARTIIND.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Aavas Financiers Ltd.",
    "ticker": "AAVAS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Abbott India Ltd.",
    "ticker": "ABBOTINDIA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Action Construction Equipment Ltd.",
    "ticker": "ACE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Acutaas Chemicals Ltd.",
    "ticker": "ACUTAAS.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Adani Energy Solutions Ltd.",
    "ticker": "ADANIENSOL.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Adani Enterprises Ltd.",
    "ticker": "ADANIENT.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Adani Green Energy Ltd.",
    "ticker": "ADANIGREEN.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Adani Ports and Special Economic Zone Ltd.",
    "ticker": "ADANIPORTS.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Adani Power Ltd.",
    "ticker": "ADANIPOWER.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Adani Total Gas Ltd.",
    "ticker": "ATGL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Birla Capital Ltd.",
    "ticker": "ABCAPITAL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Birla Fashion and Retail Ltd.",
    "ticker": "ABFRL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Birla Lifestyle Brands Ltd.",
    "ticker": "ABLBL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Birla Real Estate Ltd.",
    "ticker": "ABREL.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Birla Sun Life AMC Ltd.",
    "ticker": "ABSLAMC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Aditya Infotech Ltd.",
    "ticker": "CPPLUS.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Aegis Logistics Ltd.",
    "ticker": "AEGISLOG.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Aegis Vopak Terminals Ltd.",
    "ticker": "AEGISVOPAK.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Afcons Infrastructure Ltd.",
    "ticker": "AFCONS.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Affle 3i Ltd.",
    "ticker": "AFFLE.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Ajanta Pharmaceuticals Ltd.",
    "ticker": "AJANTPHARM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Alkem Laboratories Ltd.",
    "ticker": "ALKEM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Allied Blenders and Distillers Ltd.",
    "ticker": "ABDL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Amara Raja Energy & Mobility Ltd.",
    "ticker": "ARE&M.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Amber Enterprises India Ltd.",
    "ticker": "AMBER.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Ambuja Cements Ltd.",
    "ticker": "AMBUJACEM.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Anand Rathi Wealth Ltd.",
    "ticker": "ANANDRATHI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Anant Raj Ltd.",
    "ticker": "ANANTRAJ.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Angel One Ltd.",
    "ticker": "ANGELONE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Anthem Biosciences Ltd.",
    "ticker": "ANTHEM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Anupam Rasayan India Ltd.",
    "ticker": "ANURAS.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Apar Industries Ltd.",
    "ticker": "APARINDS.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Apollo Hospitals Enterprise Ltd.",
    "ticker": "APOLLOHOSP.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Apollo Tyres Ltd.",
    "ticker": "APOLLOTYRE.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Aptus Value Housing Finance India Ltd.",
    "ticker": "APTUS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Asahi India Glass Ltd.",
    "ticker": "ASAHIINDIA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Ashok Leyland Ltd.",
    "ticker": "ASHOKLEY.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Asian Paints Ltd.",
    "ticker": "ASIANPAINT.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Aster DM Healthcare Ltd.",
    "ticker": "ASTERDM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Astral Ltd.",
    "ticker": "ASTRAL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Ather Energy Ltd.",
    "ticker": "ATHERENERG.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Atul Ltd.",
    "ticker": "ATUL.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Aurobindo Pharma Ltd.",
    "ticker": "AUROPHARMA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Authum Investment & Infrastructure Ltd.",
    "ticker": "AIIL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Avenue Supermarts Ltd.",
    "ticker": "DMART.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Axis Bank Ltd.",
    "ticker": "AXISBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "BEML Ltd.",
    "ticker": "BEML.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "BLS International Services Ltd.",
    "ticker": "BLS.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "BSE Ltd.",
    "ticker": "BSE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bajaj Auto Ltd.",
    "ticker": "BAJAJ-AUTO.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Bajaj Finance Ltd.",
    "ticker": "BAJFINANCE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bajaj Finserv Ltd.",
    "ticker": "BAJAJFINSV.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bajaj Holdings & Investment Ltd.",
    "ticker": "BAJAJHLDNG.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bajaj Housing Finance Ltd.",
    "ticker": "BAJAJHFL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Balkrishna Industries Ltd.",
    "ticker": "BALKRISIND.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Balrampur Chini Mills Ltd.",
    "ticker": "BALRAMCHIN.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Bandhan Bank Ltd.",
    "ticker": "BANDHANBNK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bank of Baroda",
    "ticker": "BANKBARODA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bank of India",
    "ticker": "BANKINDIA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bank of Maharashtra",
    "ticker": "MAHABANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Bata India Ltd.",
    "ticker": "BATAINDIA.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Bayer Cropscience Ltd.",
    "ticker": "BAYERCROP.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Belrise Industries Ltd.",
    "ticker": "BELRISE.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Berger Paints India Ltd.",
    "ticker": "BERGEPAINT.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Bharat Dynamics Ltd.",
    "ticker": "BDL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Bharat Electronics Ltd.",
    "ticker": "BEL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Bharat Forge Ltd.",
    "ticker": "BHARATFORG.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Bharat Heavy Electricals Ltd.",
    "ticker": "BHEL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Bharat Petroleum Corporation Ltd.",
    "ticker": "BPCL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Bharti Airtel Ltd.",
    "ticker": "BHARTIARTL.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Bharti Hexacom Ltd.",
    "ticker": "BHARTIHEXA.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Bikaji Foods International Ltd.",
    "ticker": "BIKAJI.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Billionbrains Garage Ventures Ltd.",
    "ticker": "GROWW.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Biocon Ltd.",
    "ticker": "BIOCON.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Birlasoft Ltd.",
    "ticker": "BSOFT.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Blue Dart Express Ltd.",
    "ticker": "BLUEDART.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Blue Jet Healthcare Ltd.",
    "ticker": "BLUEJET.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Blue Star Ltd.",
    "ticker": "BLUESTARCO.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Bombay Burmah Trading Corporation Ltd.",
    "ticker": "BBTC.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Bosch Ltd.",
    "ticker": "BOSCHLTD.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Brainbees Solutions Ltd.",
    "ticker": "FIRSTCRY.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Brigade Enterprises Ltd.",
    "ticker": "BRIGADE.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Britannia Industries Ltd.",
    "ticker": "BRITANNIA.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "C.E. Info Systems Ltd.",
    "ticker": "MAPMYINDIA.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "CCL Products (I) Ltd.",
    "ticker": "CCL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "CESC Ltd.",
    "ticker": "CESC.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "CG Power and Industrial Solutions Ltd.",
    "ticker": "CGPOWER.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "CRISIL Ltd.",
    "ticker": "CRISIL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Can Fin Homes Ltd.",
    "ticker": "CANFINHOME.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Canara Bank",
    "ticker": "CANBK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Canara HSBC Life Insurance Company Ltd.",
    "ticker": "CANHLIFE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Caplin Point Laboratories Ltd.",
    "ticker": "CAPLIPOINT.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Capri Global Capital Ltd.",
    "ticker": "CGCL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Carborundum Universal Ltd.",
    "ticker": "CARBORUNIV.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Cartrade Tech Ltd.",
    "ticker": "CARTRADE.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Castrol India Ltd.",
    "ticker": "CASTROLIND.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Ceat Ltd.",
    "ticker": "CEATLTD.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Cemindia Projects Ltd.",
    "ticker": "CEMPRO.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Central Bank of India",
    "ticker": "CENTRALBK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Central Depository Services (India) Ltd.",
    "ticker": "CDSL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Chalet Hotels Ltd.",
    "ticker": "CHALET.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Chambal Fertilizers & Chemicals Ltd.",
    "ticker": "CHAMBLFERT.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Chennai Petroleum Corporation Ltd.",
    "ticker": "CHENNPETRO.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Choice International Ltd.",
    "ticker": "CHOICEIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Cholamandalam Financial Holdings Ltd.",
    "ticker": "CHOLAHLDNG.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Cholamandalam Investment and Finance Company Ltd.",
    "ticker": "CHOLAFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Cipla Ltd.",
    "ticker": "CIPLA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "City Union Bank Ltd.",
    "ticker": "CUB.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Clean Science and Technology Ltd.",
    "ticker": "CLEAN.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Coal India Ltd.",
    "ticker": "COALINDIA.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Cochin Shipyard Ltd.",
    "ticker": "COCHINSHIP.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Coforge Ltd.",
    "ticker": "COFORGE.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Cohance Lifesciences Ltd.",
    "ticker": "COHANCE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Colgate Palmolive (India) Ltd.",
    "ticker": "COLPAL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Computer Age Management Services Ltd.",
    "ticker": "CAMS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Concord Biotech Ltd.",
    "ticker": "CONCORDBIO.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Container Corporation of India Ltd.",
    "ticker": "CONCOR.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Coromandel International Ltd.",
    "ticker": "COROMANDEL.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Craftsman Automation Ltd.",
    "ticker": "CRAFTSMAN.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "CreditAccess Grameen Ltd.",
    "ticker": "CREDITACC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Crompton Greaves Consumer Electricals Ltd.",
    "ticker": "CROMPTON.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Cummins India Ltd.",
    "ticker": "CUMMINSIND.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Cyient Ltd.",
    "ticker": "CYIENT.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "DCM Shriram Ltd.",
    "ticker": "DCMSHRIRAM.NS",
    "type": "Stock",
    "sector": "Diversified",
    "exchange": "NSE"
  },
  {
    "name": "DLF Ltd.",
    "ticker": "DLF.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "DOMS Industries Ltd.",
    "ticker": "DOMS.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Dabur India Ltd.",
    "ticker": "DABUR.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Dalmia Bharat Ltd.",
    "ticker": "DALBHARAT.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Data Patterns (India) Ltd.",
    "ticker": "DATAPATTNS.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Deepak Fertilisers & Petrochemicals Corp. Ltd.",
    "ticker": "DEEPAKFERT.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Deepak Nitrite Ltd.",
    "ticker": "DEEPAKNTR.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Delhivery Ltd.",
    "ticker": "DELHIVERY.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Devyani International Ltd.",
    "ticker": "DEVYANI.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Divis Laboratories Ltd.",
    "ticker": "DIVISLAB.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Dixon Technologies (India) Ltd.",
    "ticker": "DIXON.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Dr. Lal Path Labs Ltd.",
    "ticker": "LALPATHLAB.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Dr. Reddys Laboratories Ltd.",
    "ticker": "DRREDDY.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "E.I.D. Parry (India) Ltd.",
    "ticker": "EIDPARRY.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "EIH Ltd.",
    "ticker": "EIHOTEL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Eicher Motors Ltd.",
    "ticker": "EICHERMOT.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Elecon Engineering Co. Ltd.",
    "ticker": "ELECON.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Elgi Equipments Ltd.",
    "ticker": "ELGIEQUIP.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Emami Ltd.",
    "ticker": "EMAMILTD.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Emcure Pharmaceuticals Ltd.",
    "ticker": "EMCURE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Emmvee Photovoltaic Power Ltd.",
    "ticker": "EMMVEE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Endurance Technologies Ltd.",
    "ticker": "ENDURANCE.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Engineers India Ltd.",
    "ticker": "ENGINERSIN.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Eris Lifesciences Ltd.",
    "ticker": "ERIS.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Escorts Kubota Ltd.",
    "ticker": "ESCORTS.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Eternal Ltd.",
    "ticker": "ETERNAL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Exide Industries Ltd.",
    "ticker": "EXIDEIND.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "FSN E-Commerce Ventures Ltd.",
    "ticker": "NYKAA.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Federal Bank Ltd.",
    "ticker": "FEDERALBNK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Fertilisers and Chemicals Travancore Ltd.",
    "ticker": "FACT.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Finolex Cables Ltd.",
    "ticker": "FINCABLES.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Firstsource Solutions Ltd.",
    "ticker": "FSL.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Five-Star Business Finance Ltd.",
    "ticker": "FIVESTAR.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Force Motors Ltd.",
    "ticker": "FORCEMOT.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Fortis Healthcare Ltd.",
    "ticker": "FORTIS.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "GAIL (India) Ltd.",
    "ticker": "GAIL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "GE Vernova T&D India Ltd.",
    "ticker": "GVT&D.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "GMR Airports Ltd.",
    "ticker": "GMRAIRPORT.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Gabriel India Ltd.",
    "ticker": "GABRIEL.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Gallantt Ispat Ltd.",
    "ticker": "GALLANTT.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Garden Reach Shipbuilders & Engineers Ltd.",
    "ticker": "GRSE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "General Insurance Corporation of India",
    "ticker": "GICRE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Gillette India Ltd.",
    "ticker": "GILLETTE.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Gland Pharma Ltd.",
    "ticker": "GLAND.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Glaxosmithkline Pharmaceuticals Ltd.",
    "ticker": "GLAXO.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Glenmark Pharmaceuticals Ltd.",
    "ticker": "GLENMARK.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Global Health Ltd.",
    "ticker": "MEDANTA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Go Digit General Insurance Ltd.",
    "ticker": "GODIGIT.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Godawari Power & Ispat Ltd.",
    "ticker": "GPIL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Godfrey Phillips India Ltd.",
    "ticker": "GODFRYPHLP.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Godrej Consumer Products Ltd.",
    "ticker": "GODREJCP.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Godrej Industries Ltd.",
    "ticker": "GODREJIND.NS",
    "type": "Stock",
    "sector": "Diversified",
    "exchange": "NSE"
  },
  {
    "name": "Godrej Properties Ltd.",
    "ticker": "GODREJPROP.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Granules India Ltd.",
    "ticker": "GRANULES.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Graphite India Ltd.",
    "ticker": "GRAPHITE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Grasim Industries Ltd.",
    "ticker": "GRASIM.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Gravita India Ltd.",
    "ticker": "GRAVITA.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Great Eastern Shipping Co. Ltd.",
    "ticker": "GESHIP.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Gujarat Fluorochemicals Ltd.",
    "ticker": "FLUOROCHEM.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Gujarat Mineral Development Corporation Ltd.",
    "ticker": "GMDCLTD.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Gujarat State Petronet Ltd.",
    "ticker": "GSPL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "H.E.G. Ltd.",
    "ticker": "HEG.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "HBL Engineering Ltd.",
    "ticker": "HBLENGINE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "HCL Technologies Ltd.",
    "ticker": "HCLTECH.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "HDB Financial Services Ltd.",
    "ticker": "HDBFS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "HDFC Asset Management Company Ltd.",
    "ticker": "HDFCAMC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "HDFC Bank Ltd.",
    "ticker": "HDFCBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "HDFC Life Insurance Company Ltd.",
    "ticker": "HDFCLIFE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "HFCL Ltd.",
    "ticker": "HFCL.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Havells India Ltd.",
    "ticker": "HAVELLS.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Hero MotoCorp Ltd.",
    "ticker": "HEROMOTOCO.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Hexaware Technologies Ltd.",
    "ticker": "HEXT.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Himadri Speciality Chemical Ltd.",
    "ticker": "HSCL.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Hindalco Industries Ltd.",
    "ticker": "HINDALCO.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Hindustan Aeronautics Ltd.",
    "ticker": "HAL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Hindustan Copper Ltd.",
    "ticker": "HINDCOPPER.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Hindustan Petroleum Corporation Ltd.",
    "ticker": "HINDPETRO.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Hindustan Unilever Ltd.",
    "ticker": "HINDUNILVR.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Hindustan Zinc Ltd.",
    "ticker": "HINDZINC.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Hitachi Energy India Ltd.",
    "ticker": "POWERINDIA.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Home First Finance Company India Ltd.",
    "ticker": "HOMEFIRST.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Honasa Consumer Ltd.",
    "ticker": "HONASA.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Honeywell Automation India Ltd.",
    "ticker": "HONAUT.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Housing & Urban Development Corporation Ltd.",
    "ticker": "HUDCO.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Hyundai Motor India Ltd.",
    "ticker": "HYUNDAI.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "ICICI Bank Ltd.",
    "ticker": "ICICIBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "ICICI Lombard General Insurance Company Ltd.",
    "ticker": "ICICIGI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "ICICI Prudential Asset Management Company Ltd.",
    "ticker": "ICICIAMC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "ICICI Prudential Life Insurance Company Ltd.",
    "ticker": "ICICIPRULI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "IDBI Bank Ltd.",
    "ticker": "IDBI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "IDFC First Bank Ltd.",
    "ticker": "IDFCFIRSTB.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "IFCI Ltd.",
    "ticker": "IFCI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "IIFL Finance Ltd.",
    "ticker": "IIFL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "IRB Infrastructure Developers Ltd.",
    "ticker": "IRB.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "IRCON International Ltd.",
    "ticker": "IRCON.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "ITC Hotels Ltd.",
    "ticker": "ITCHOTELS.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "ITC Ltd.",
    "ticker": "ITC.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "ITI Ltd.",
    "ticker": "ITI.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Indegene Ltd.",
    "ticker": "INDGN.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "India Cements Ltd.",
    "ticker": "INDIACEM.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Indiamart Intermesh Ltd.",
    "ticker": "INDIAMART.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Bank",
    "ticker": "INDIANB.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Energy Exchange Ltd.",
    "ticker": "IEX.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Hotels Co. Ltd.",
    "ticker": "INDHOTEL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Oil Corporation Ltd.",
    "ticker": "IOC.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Indian Overseas Bank",
    "ticker": "IOB.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Railway Catering And Tourism Corporation Ltd.",
    "ticker": "IRCTC.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Railway Finance Corporation Ltd.",
    "ticker": "IRFC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Indian Renewable Energy Development Agency Ltd.",
    "ticker": "IREDA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Indraprastha Gas Ltd.",
    "ticker": "IGL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Indus Towers Ltd.",
    "ticker": "INDUSTOWER.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "IndusInd Bank Ltd.",
    "ticker": "INDUSINDBK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Info Edge (India) Ltd.",
    "ticker": "NAUKRI.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Infosys Ltd.",
    "ticker": "INFY.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Inox Wind Ltd.",
    "ticker": "INOXWIND.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Intellect Design Arena Ltd.",
    "ticker": "INTELLECT.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "InterGlobe Aviation Ltd.",
    "ticker": "INDIGO.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "International Gemmological Institute (India) Ltd.",
    "ticker": "IGIL.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Inventurus Knowledge Solutions Ltd.",
    "ticker": "IKS.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Ipca Laboratories Ltd.",
    "ticker": "IPCALAB.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "J.B. Chemicals & Pharmaceuticals Ltd.",
    "ticker": "JBCHEPHARM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "J.K. Cement Ltd.",
    "ticker": "JKCEMENT.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "JBM Auto Ltd.",
    "ticker": "JBMA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "JK Tyre & Industries Ltd.",
    "ticker": "JKTYRE.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "JM Financial Ltd.",
    "ticker": "JMFINANCIL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "JSW Cement Ltd.",
    "ticker": "JSWCEMENT.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "JSW Dulux Ltd.",
    "ticker": "JSWDULUX.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "JSW Energy Ltd.",
    "ticker": "JSWENERGY.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "JSW Infrastructure Ltd.",
    "ticker": "JSWINFRA.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "JSW Steel Ltd.",
    "ticker": "JSWSTEEL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Jain Resource Recycling Ltd.",
    "ticker": "JAINREC.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Jaiprakash Power Ventures Ltd.",
    "ticker": "JPPOWER.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Jammu & Kashmir Bank Ltd.",
    "ticker": "J&KBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Jindal Saw Ltd.",
    "ticker": "JINDALSAW.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Jindal Stainless Ltd.",
    "ticker": "JSL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Jindal Steel Ltd.",
    "ticker": "JINDALSTEL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Jio Financial Services Ltd.",
    "ticker": "JIOFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Jubilant Foodworks Ltd.",
    "ticker": "JUBLFOOD.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Jubilant Ingrevia Ltd.",
    "ticker": "JUBLINGREA.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Jubilant Pharmova Ltd.",
    "ticker": "JUBLPHARMA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Jupiter Wagons Ltd.",
    "ticker": "JWL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Jyoti CNC Automation Ltd.",
    "ticker": "JYOTICNC.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "K.P.R. Mill Ltd.",
    "ticker": "KPRMILL.NS",
    "type": "Stock",
    "sector": "Textiles",
    "exchange": "NSE"
  },
  {
    "name": "KEI Industries Ltd.",
    "ticker": "KEI.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "KPIT Technologies Ltd.",
    "ticker": "KPITTECH.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Kajaria Ceramics Ltd.",
    "ticker": "KAJARIACER.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Kalpataru Projects International Ltd.",
    "ticker": "KPIL.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Kalyan Jewellers India Ltd.",
    "ticker": "KALYANKJIL.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Karur Vysya Bank Ltd.",
    "ticker": "KARURVYSYA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Kaynes Technology India Ltd.",
    "ticker": "KAYNES.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Kec International Ltd.",
    "ticker": "KEC.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Kfin Technologies Ltd.",
    "ticker": "KFINTECH.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Kirloskar Oil Eng Ltd.",
    "ticker": "KIRLOSENG.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Kotak Mahindra Bank Ltd.",
    "ticker": "KOTAKBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Krishna Institute of Medical Sciences Ltd.",
    "ticker": "KIMS.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "L&T Finance Ltd.",
    "ticker": "LTF.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "L&T Technology Services Ltd.",
    "ticker": "LTTS.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "LG Electronics India Ltd.",
    "ticker": "LGEINDIA.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "LIC Housing Finance Ltd.",
    "ticker": "LICHSGFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "LT Foods Ltd.",
    "ticker": "LTFOODS.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "LTIMindtree Ltd.",
    "ticker": "LTM.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Larsen & Toubro Ltd.",
    "ticker": "LT.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Latent View Analytics Ltd.",
    "ticker": "LATENTVIEW.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Laurus Labs Ltd.",
    "ticker": "LAURUSLABS.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Leela Palaces Hotels & Resorts Ltd.",
    "ticker": "THELEELA.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Lemon Tree Hotels Ltd.",
    "ticker": "LEMONTREE.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Lenskart Solutions Ltd.",
    "ticker": "LENSKART.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Life Insurance Corporation of India",
    "ticker": "LICI.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Linde India Ltd.",
    "ticker": "LINDEINDIA.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Lloyds Metals And Energy Ltd.",
    "ticker": "LLOYDSME.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Lodha Developers Ltd.",
    "ticker": "LODHA.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Lupin Ltd.",
    "ticker": "LUPIN.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "MMTC Ltd.",
    "ticker": "MMTC.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "MRF Ltd.",
    "ticker": "MRF.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Mahanagar Gas Ltd.",
    "ticker": "MGL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Mahindra & Mahindra Financial Services Ltd.",
    "ticker": "M&MFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Mahindra & Mahindra Ltd.",
    "ticker": "M&M.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Manappuram Finance Ltd.",
    "ticker": "MANAPPURAM.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Mangalore Refinery & Petrochemicals Ltd.",
    "ticker": "MRPL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Mankind Pharma Ltd.",
    "ticker": "MANKIND.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Marico Ltd.",
    "ticker": "MARICO.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Maruti Suzuki India Ltd.",
    "ticker": "MARUTI.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Max Financial Services Ltd.",
    "ticker": "MFSL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Max Healthcare Institute Ltd.",
    "ticker": "MAXHEALTH.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Mazagoan Dock Shipbuilders Ltd.",
    "ticker": "MAZDOCK.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Meesho Ltd.",
    "ticker": "MEESHO.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Minda Corporation Ltd.",
    "ticker": "MINDACORP.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Motherson Sumi Wiring India Ltd.",
    "ticker": "MSUMI.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Motilal Oswal Financial Services Ltd.",
    "ticker": "MOTILALOFS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "MphasiS Ltd.",
    "ticker": "MPHASIS.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Multi Commodity Exchange of India Ltd.",
    "ticker": "MCX.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Muthoot Finance Ltd.",
    "ticker": "MUTHOOTFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "NATCO Pharma Ltd.",
    "ticker": "NATCOPHARM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "NBCC (India) Ltd.",
    "ticker": "NBCC.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "NCC Ltd.",
    "ticker": "NCC.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "NHPC Ltd.",
    "ticker": "NHPC.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "NLC India Ltd.",
    "ticker": "NLCINDIA.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "NMDC Ltd.",
    "ticker": "NMDC.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "NMDC Steel Ltd.",
    "ticker": "NSLNISP.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "NTPC Green Energy Ltd.",
    "ticker": "NTPCGREEN.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "NTPC Ltd.",
    "ticker": "NTPC.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Narayana Hrudayalaya Ltd.",
    "ticker": "NH.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "National Aluminium Co. Ltd.",
    "ticker": "NATIONALUM.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Nava Ltd.",
    "ticker": "NAVA.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Navin Fluorine International Ltd.",
    "ticker": "NAVINFLUOR.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Nestle India Ltd.",
    "ticker": "NESTLEIND.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Netweb Technologies India Ltd.",
    "ticker": "NETWEB.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Neuland Laboratories Ltd.",
    "ticker": "NEULANDLAB.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Newgen Software Technologies Ltd.",
    "ticker": "NEWGEN.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Nippon Life India Asset Management Ltd.",
    "ticker": "NAM-INDIA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Niva Bupa Health Insurance Company Ltd.",
    "ticker": "NIVABUPA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Nuvama Wealth Management Ltd.",
    "ticker": "NUVAMA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Nuvoco Vistas Corporation Ltd.",
    "ticker": "NUVOCO.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Oberoi Realty Ltd.",
    "ticker": "OBEROIRLTY.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Oil & Natural Gas Corporation Ltd.",
    "ticker": "ONGC.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Oil India Ltd.",
    "ticker": "OIL.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Ola Electric Mobility Ltd.",
    "ticker": "OLAELEC.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Olectra Greentech Ltd.",
    "ticker": "OLECTRA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "One 97 Communications Ltd.",
    "ticker": "PAYTM.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Onesource Specialty Pharma Ltd.",
    "ticker": "ONESOURCE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Oracle Financial Services Software Ltd.",
    "ticker": "OFSS.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "PB Fintech Ltd.",
    "ticker": "POLICYBZR.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "PCBL Chemical Ltd.",
    "ticker": "PCBL.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "PG Electroplast Ltd.",
    "ticker": "PGEL.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "PI Industries Ltd.",
    "ticker": "PIIND.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "PNB Housing Finance Ltd.",
    "ticker": "PNBHOUSING.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "PTC Industries Ltd.",
    "ticker": "PTCIL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "PVR INOX Ltd.",
    "ticker": "PVRINOX.NS",
    "type": "Stock",
    "sector": "Media Entertainment & Publication",
    "exchange": "NSE"
  },
  {
    "name": "Page Industries Ltd.",
    "ticker": "PAGEIND.NS",
    "type": "Stock",
    "sector": "Textiles",
    "exchange": "NSE"
  },
  {
    "name": "Paradeep Phosphates Ltd.",
    "ticker": "PARADEEP.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Patanjali Foods Ltd.",
    "ticker": "PATANJALI.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Persistent Systems Ltd.",
    "ticker": "PERSISTENT.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Petronet LNG Ltd.",
    "ticker": "PETRONET.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Pfizer Ltd.",
    "ticker": "PFIZER.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Phoenix Mills Ltd.",
    "ticker": "PHOENIXLTD.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Physicswallah Ltd.",
    "ticker": "PWL.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Pidilite Industries Ltd.",
    "ticker": "PIDILITIND.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Pine Labs Ltd.",
    "ticker": "PINELABS.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Piramal Finance Ltd.",
    "ticker": "PIRAMALFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Piramal Pharma Ltd.",
    "ticker": "PPLPHARMA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Poly Medicure Ltd.",
    "ticker": "POLYMED.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Polycab India Ltd.",
    "ticker": "POLYCAB.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Poonawalla Fincorp Ltd.",
    "ticker": "POONAWALLA.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Power Finance Corporation Ltd.",
    "ticker": "PFC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Power Grid Corporation of India Ltd.",
    "ticker": "POWERGRID.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Premier Energies Ltd.",
    "ticker": "PREMIERENE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Prestige Estates Projects Ltd.",
    "ticker": "PRESTIGE.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Punjab National Bank",
    "ticker": "PNB.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "R R Kabel Ltd.",
    "ticker": "RRKABEL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "RBL Bank Ltd.",
    "ticker": "RBLBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "REC Ltd.",
    "ticker": "RECLTD.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "RHI MAGNESITA INDIA LTD.",
    "ticker": "RHIM.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "RITES Ltd.",
    "ticker": "RITES.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Radico Khaitan Ltd",
    "ticker": "RADICO.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Rail Vikas Nigam Ltd.",
    "ticker": "RVNL.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Railtel Corporation Of India Ltd.",
    "ticker": "RAILTEL.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Rainbow Childrens Medicare Ltd.",
    "ticker": "RAINBOW.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Ramkrishna Forgings Ltd.",
    "ticker": "RKFORGE.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Redington Ltd.",
    "ticker": "REDINGTON.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Reliance Industries Ltd.",
    "ticker": "RELIANCE.NS",
    "type": "Stock",
    "sector": "Oil Gas & Consumable Fuels",
    "exchange": "NSE"
  },
  {
    "name": "Reliance Power Ltd.",
    "ticker": "RPOWER.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "SBFC Finance Ltd.",
    "ticker": "SBFC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "SBI Cards and Payment Services Ltd.",
    "ticker": "SBICARD.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "SBI Life Insurance Company Ltd.",
    "ticker": "SBILIFE.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "SJVN Ltd.",
    "ticker": "SJVN.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "SRF Ltd.",
    "ticker": "SRF.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Sagility Ltd.",
    "ticker": "SAGILITY.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Sai Life Sciences Ltd.",
    "ticker": "SAILIFE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Sammaan Capital Ltd.",
    "ticker": "SAMMAANCAP.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Samvardhana Motherson International Ltd.",
    "ticker": "MOTHERSON.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Sapphire Foods India Ltd.",
    "ticker": "SAPPHIRE.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Sarda Energy and Minerals Ltd.",
    "ticker": "SARDAEN.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Saregama India Ltd",
    "ticker": "SAREGAMA.NS",
    "type": "Stock",
    "sector": "Media Entertainment & Publication",
    "exchange": "NSE"
  },
  {
    "name": "Schaeffler India Ltd.",
    "ticker": "SCHAEFFLER.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Schneider Electric Infrastructure Ltd.",
    "ticker": "SCHNEIDER.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Shipping Corporation of India Ltd.",
    "ticker": "SCI.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  },
  {
    "name": "Shree Cement Ltd.",
    "ticker": "SHREECEM.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Shriram Finance Ltd.",
    "ticker": "SHRIRAMFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Shyam Metalics and Energy Ltd.",
    "ticker": "SHYAMMETL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Siemens Energy India Ltd.",
    "ticker": "ENRIN.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Siemens Ltd.",
    "ticker": "SIEMENS.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Signatureglobal (India) Ltd.",
    "ticker": "SIGNATURE.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Sobha Ltd.",
    "ticker": "SOBHA.NS",
    "type": "Stock",
    "sector": "Realty",
    "exchange": "NSE"
  },
  {
    "name": "Solar Industries India Ltd.",
    "ticker": "SOLARINDS.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Sona BLW Precision Forgings Ltd.",
    "ticker": "SONACOMS.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Sonata Software Ltd.",
    "ticker": "SONATSOFTW.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Star Health and Allied Insurance Company Ltd.",
    "ticker": "STARHEALTH.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "State Bank of India",
    "ticker": "SBIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Steel Authority of India Ltd.",
    "ticker": "SAIL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Sumitomo Chemical India Ltd.",
    "ticker": "SUMICHEM.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Sun Pharmaceutical Industries Ltd.",
    "ticker": "SUNPHARMA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Sun TV Network Ltd.",
    "ticker": "SUNTV.NS",
    "type": "Stock",
    "sector": "Media Entertainment & Publication",
    "exchange": "NSE"
  },
  {
    "name": "Sundaram Finance Ltd.",
    "ticker": "SUNDARMFIN.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Supreme Industries Ltd.",
    "ticker": "SUPREMEIND.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Supreme Petrochem Ltd.",
    "ticker": "SPLPETRO.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Suzlon Energy Ltd.",
    "ticker": "SUZLON.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Swan Corp Ltd.",
    "ticker": "SWANCORP.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Swiggy Ltd.",
    "ticker": "SWIGGY.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Syngene International Ltd.",
    "ticker": "SYNGENE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Syrma SGS Technology Ltd.",
    "ticker": "SYRMA.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "TBO Tek Ltd.",
    "ticker": "TBOTEK.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "TVS Motor Company Ltd.",
    "ticker": "TVSMOTOR.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Tata Capital Ltd.",
    "ticker": "TATACAP.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Tata Chemicals Ltd.",
    "ticker": "TATACHEM.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "Tata Communications Ltd.",
    "ticker": "TATACOMM.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Tata Consultancy Services Ltd.",
    "ticker": "TCS.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Tata Consumer Products Ltd.",
    "ticker": "TATACONSUM.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Tata Elxsi Ltd.",
    "ticker": "TATAELXSI.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Tata Investment Corporation Ltd.",
    "ticker": "TATAINVEST.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "Tata Motors Ltd.",
    "ticker": "TMCV.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Tata Motors Passenger Vehicles Ltd.",
    "ticker": "TMPV.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Tata Power Co. Ltd.",
    "ticker": "TATAPOWER.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Tata Steel Ltd.",
    "ticker": "TATASTEEL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Tata Technologies Ltd.",
    "ticker": "TATATECH.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Tata Teleservices (Maharashtra) Ltd.",
    "ticker": "TTML.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Tech Mahindra Ltd.",
    "ticker": "TECHM.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Techno Electric & Engineering Company Ltd.",
    "ticker": "TECHNOE.NS",
    "type": "Stock",
    "sector": "Construction",
    "exchange": "NSE"
  },
  {
    "name": "Tega Industries Ltd.",
    "ticker": "TEGA.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Tejas Networks Ltd.",
    "ticker": "TEJASNET.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Tenneco Clean Air India Ltd.",
    "ticker": "TENNIND.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "The New India Assurance Company Ltd.",
    "ticker": "NIACL.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "The Ramco Cements Ltd.",
    "ticker": "RAMCOCEM.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Thermax Ltd.",
    "ticker": "THERMAX.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Timken India Ltd.",
    "ticker": "TIMKEN.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Titagarh Rail Systems Ltd.",
    "ticker": "TITAGARH.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Titan Company Ltd.",
    "ticker": "TITAN.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Torrent Pharmaceuticals Ltd.",
    "ticker": "TORNTPHARM.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Torrent Power Ltd.",
    "ticker": "TORNTPOWER.NS",
    "type": "Stock",
    "sector": "Power",
    "exchange": "NSE"
  },
  {
    "name": "Transformers And Rectifiers (India) Ltd.",
    "ticker": "TARIL.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Travel Food Services Ltd.",
    "ticker": "TRAVELFOOD.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Trent Ltd.",
    "ticker": "TRENT.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Trident Ltd.",
    "ticker": "TRIDENT.NS",
    "type": "Stock",
    "sector": "Textiles",
    "exchange": "NSE"
  },
  {
    "name": "Triveni Turbine Ltd.",
    "ticker": "TRITURBINE.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Tube Investments of India Ltd.",
    "ticker": "TIINDIA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "UCO Bank",
    "ticker": "UCOBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "UNO Minda Ltd.",
    "ticker": "UNOMINDA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "UPL Ltd.",
    "ticker": "UPL.NS",
    "type": "Stock",
    "sector": "Chemicals",
    "exchange": "NSE"
  },
  {
    "name": "UTI Asset Management Company Ltd.",
    "ticker": "UTIAMC.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "UltraTech Cement Ltd.",
    "ticker": "ULTRACEMCO.NS",
    "type": "Stock",
    "sector": "Construction Materials",
    "exchange": "NSE"
  },
  {
    "name": "Union Bank of India",
    "ticker": "UNIONBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "United Breweries Ltd.",
    "ticker": "UBL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "United Spirits Ltd.",
    "ticker": "UNITDSPR.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Urban Company Ltd.",
    "ticker": "URBANCO.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Usha Martin Ltd.",
    "ticker": "USHAMART.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Vardhman Textiles Ltd.",
    "ticker": "VTL.NS",
    "type": "Stock",
    "sector": "Textiles",
    "exchange": "NSE"
  },
  {
    "name": "Varun Beverages Ltd.",
    "ticker": "VBL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "Vedanta Ltd.",
    "ticker": "VEDL.NS",
    "type": "Stock",
    "sector": "Metals & Mining",
    "exchange": "NSE"
  },
  {
    "name": "Vijaya Diagnostic Centre Ltd.",
    "ticker": "VIJAYA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Vishal Mega Mart Ltd.",
    "ticker": "VMM.NS",
    "type": "Stock",
    "sector": "Consumer Services",
    "exchange": "NSE"
  },
  {
    "name": "Vodafone Idea Ltd.",
    "ticker": "IDEA.NS",
    "type": "Stock",
    "sector": "Telecommunication",
    "exchange": "NSE"
  },
  {
    "name": "Voltas Ltd.",
    "ticker": "VOLTAS.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Waaree Energies Ltd.",
    "ticker": "WAAREEENER.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Welspun Corp Ltd.",
    "ticker": "WELCORP.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Welspun Living Ltd.",
    "ticker": "WELSPUNLIV.NS",
    "type": "Stock",
    "sector": "Textiles",
    "exchange": "NSE"
  },
  {
    "name": "Whirlpool of India Ltd.",
    "ticker": "WHIRLPOOL.NS",
    "type": "Stock",
    "sector": "Consumer Durables",
    "exchange": "NSE"
  },
  {
    "name": "Wipro Ltd.",
    "ticker": "WIPRO.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Wockhardt Ltd.",
    "ticker": "WOCKPHARMA.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Yes Bank Ltd.",
    "ticker": "YESBANK.NS",
    "type": "Stock",
    "sector": "Financial Services",
    "exchange": "NSE"
  },
  {
    "name": "ZF Commercial Vehicle Control Systems India Ltd.",
    "ticker": "ZFCVINDIA.NS",
    "type": "Stock",
    "sector": "Automobile and Auto Components",
    "exchange": "NSE"
  },
  {
    "name": "Zee Entertainment Enterprises Ltd.",
    "ticker": "ZEEL.NS",
    "type": "Stock",
    "sector": "Media Entertainment & Publication",
    "exchange": "NSE"
  },
  {
    "name": "Zen Technologies Ltd.",
    "ticker": "ZENTEC.NS",
    "type": "Stock",
    "sector": "Capital Goods",
    "exchange": "NSE"
  },
  {
    "name": "Zensar Technolgies Ltd.",
    "ticker": "ZENSARTECH.NS",
    "type": "Stock",
    "sector": "Information Technology",
    "exchange": "NSE"
  },
  {
    "name": "Zydus Lifesciences Ltd.",
    "ticker": "ZYDUSLIFE.NS",
    "type": "Stock",
    "sector": "Healthcare",
    "exchange": "NSE"
  },
  {
    "name": "Zydus Wellness Ltd.",
    "ticker": "ZYDUSWELL.NS",
    "type": "Stock",
    "sector": "Fast Moving Consumer Goods",
    "exchange": "NSE"
  },
  {
    "name": "eClerx Services Ltd.",
    "ticker": "ECLERX.NS",
    "type": "Stock",
    "sector": "Services",
    "exchange": "NSE"
  }
];