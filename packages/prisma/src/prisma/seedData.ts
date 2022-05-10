import { Organization, User } from '@prisma/client';

const shared = {
  heroImageUrl: 'UNKNOWN',
  description: '都民向けの福祉サービスの相談・受付を行っております',
  avatarUrl: 'UNKNOWN',
  homePageUrl: 'UNKNOWN',
  adminId: '01F4BVK5ZA3NA42HXKAS0EDHC2',
};

export const users: User[] = [
  {
    id: '01F4BVK5ZA3NA42HXKAS0EDHC2',
    name: 'seedAdmin',
    avatarUrl: 'UNKNOWN',
    selfIntro: 'プロトタイプ用の仮ユーザーです',
    email: 'example-admin@example.com',
    heroImageUrl: 'UNKNOWN',
    password: 'TEST_USER',
    role: 'VISITOR',
    ssoSub: 'IT_IS_KURAKICHI_ORIGINAL_USER',
  },
  {
    id: '01F57P2MEJAWTM75CT151BSCD0',
    name: 'testUser',
    avatarUrl: 'UNKNOWN',
    selfIntro: 'テスト用のユーザーです',
    email: 'example-test@example.com',
    heroImageUrl: 'UNKNOWN',
    password: 'THIS_IS_TEST_USER_PASSWORD',
    role: 'EXPERT',
    ssoSub: 'IT_IS_KURAKICHI_ORIGINAL_USER',
  },
];

export const orgs: Organization[] = [
  {
    id: '01F5JQA6T3TKY3H12D43VY6066',
    name: '北海道庁',
    address: '060-8588北海道札幌市中央区北三条西6-北海道庁',
    latitude: 43.06439,
    longitude: 141.3468805,
    email: 'hokkaido@example.com',
    phoneNumber: '011-231-4111',
    ...shared,
    description: '道民向けの福祉サービスの相談・受付を行っております',
  },
  {
    id: '01F5JNGTQJX784BBMRJR7MJX8D',
    name: '青森県庁',
    address: '030-8570青森県青森市長島1-1-1青森県庁',
    latitude: 40.8242875,
    longitude: 140.7405341,
    email: 'aomori@example.com',
    phoneNumber: '017-722-1111',
    ...shared,
  },
  {
    id: '01F5JQ4V58FFJGJSENM17XJP4K',
    name: '岩手県庁',
    address: '020-8570岩手県盛岡市内丸10-1岩手県庁',
    latitude: 39.7039458,
    longitude: 141.151918,
    email: 'iwate@example.com',
    phoneNumber: '019-651-3111',
    ...shared,
  },
  {
    id: '01F5MYFMA7ADY2ZRWAFGGWGPCF',
    name: '静岡県庁',
    address: '420-8601静岡県静岡市葵区追手町9-6静岡県庁',
    latitude: 34.9768466,
    longitude: 138.3829675,
    email: 'sizuoka@example.com',
    phoneNumber: '054-221-2455',
    ...shared,
  },
  {
    id: '01F5M9M0RE9DCXWG0H6E6Y8N0M',
    name: '宮城県庁',
    address: '980-8570宮城県仙台市青葉区本町3-8-1宮城県庁',
    latitude: 38.2684433,
    longitude: 140.8677423,
    email: 'miyagi@example.com',
    phoneNumber: '022-211-2111',
    ...shared,
  },
  {
    id: '01F5M9XB4JE20NAZKQC0WS2BV1',
    name: '秋田県庁',
    address: '010-8570秋田県秋田市山王4-1-1秋田県庁',
    latitude: 39.7181948,
    longitude: 140.1033591,
    email: 'akita@example.com',
    phoneNumber: '018-860-1111',
    ...shared,
  },
  {
    id: '01F5M9YYQ9Y5NFF2D2PDHXXS8M',
    name: '山形県庁',
    address: '990-8570山形県山形市松波2-8-1山形県庁',
    latitude: 38.2404091,
    longitude: 140.3635408,
    email: 'yamagata@example.com',
    phoneNumber: '023-630-2211',
    ...shared,
  },
  {
    id: '01F5MAQMZT3AA5RPQZF64FZER7',
    name: '福島県庁',
    address:
      '960-8670福島県福島市杉妻町2-16(福島県庁内郵便局私書箱第1号)福島県庁',
    latitude: 37.7500622,
    longitude: 140.4677594,
    email: 'fukushima@example.com',
    phoneNumber: '024-521-1111',
    ...shared,
  },
  {
    id: '01F5MB8KNTK40G8D1MTY7XVCKG',
    name: '東京都庁',
    address: '163-8001東京都新宿区西新宿2-8-1東京都庁',
    latitude: 35.6896342,
    longitude: 139.6921007,
    email: 'tokyo@example.com',
    phoneNumber: '03-5321-1111',
    ...shared,
    description: '都民向けの福祉サービスの相談・受付を行っております',
  },
  {
    id: '01F5MYGH3TMYFD6KXH6S4X514M',
    name: '愛知県庁',
    address: '460-8501愛知県名古屋市中区三の丸3-1-2愛知県庁',
    latitude: 35.1802953,
    longitude: 136.9067123,
    email: 'aiti@example.com',
    phoneNumber: '052-961-2111',
    ...shared,
  },
  {
    id: '01F5MXXWXVETEC9JE9G4VBTJX4',
    name: '茨城県庁',
    address: '310-8555茨城県水戸市笠原町978-6茨城県庁',
    latitude: 36.3418069,
    longitude: 140.4472103,
    email: 'ibaraki@example.com',
    phoneNumber: '028-623-2323',
    ...shared,
  },
  {
    id: '01F5MY0YNPKPGJK72FRE3KXREP',
    name: '栃木県庁',
    address: '320-8501栃木県宇都宮市塙田1-1-20栃木県庁',
    latitude: 36.5658064,
    longitude: 139.8836147,
    email: 'tochigi@example.com',
    phoneNumber: '028-623-2323',
    ...shared,
  },
  {
    id: '01F5MY300VJZ5N6RC9B783S6MW',
    name: '群馬県庁',
    address: '371-8570群馬県前橋市大手町1-1-1群馬県庁',
    latitude: 36.391192,
    longitude: 139.0608083,
    email: 'gunma@example.com',
    phoneNumber: '027-223-1111',
    ...shared,
  },
  {
    id: '01F5MY3YGJC90VA7YH61N5W5TG',
    name: '埼玉県庁',
    address: '330-9301埼玉県さいたま市浦和区高砂3-15-1埼玉県',
    latitude: 35.8573145,
    longitude: 139.6487218,
    email: 'saitama@example.com',
    phoneNumber: '048-824-2111',
    ...shared,
  },
  {
    id: '01F5MY4X3TRAGY57A2PDK5353M',
    name: '千葉県庁',
    address: '260-8667千葉県千葉市中央区市場町1-1千葉県',
    latitude: 35.6050793,
    longitude: 140.123328,
    email: 'chiba@example.com',
    phoneNumber: '043-223-2110',
    ...shared,
  },
  {
    id: '01F5MY6F6VGD15S38BC550RKM8',
    name: '神奈川県庁',
    address: '231-8588神奈川県横浜市中区日本大通1神奈川県庁',
    latitude: 35.4477712,
    longitude: 139.6425415,
    email: 'kanagawa@example.com',
    phoneNumber: '045-210-1111',
    ...shared,
  },
  {
    id: '01F5MY7WKZB3HFNE7ZS80D9ZHY',
    name: '新潟県庁',
    address: '950-8570新潟県新潟市中央区新光町4-1新潟県庁',
    latitude: 37.9022418,
    longitude: 139.0235109,
    email: 'niigata@example.com',
    phoneNumber: '025-285-5511',
    ...shared,
  },
  {
    id: '01F5MY8N32F2SRZWB5A6H2CDAQ',
    name: '富山県庁',
    address: '930-8501富山県富山市新総曲輪1-7富山県庁',
    latitude: 36.6955173,
    longitude: 137.2112614,
    email: 'toyama@example.com',
    phoneNumber: '076-431-4111',
    ...shared,
  },
  {
    id: '01F5MY9DNXC1VQKWJ9APR2G0AV',
    name: '石川県庁',
    address: '920-8580石川県金沢市鞍月1-1番地石川県庁',
    latitude: 36.5946708,
    longitude: 136.6256627,
    email: 'ishikawa@example.com',
    phoneNumber: '076-225-1111',
    ...shared,
  },
  {
    id: '01F5MYACXNZV5ZVXZRS7FZH2DA',
    name: '福井県庁',
    address: '910-8580福井県福井市大手3-17-1福井県庁',
    latitude: 36.0650265,
    longitude: 136.2217417,
    email: 'fukui@example.com',
    phoneNumber: '0776-21-1111',
    ...shared,
  },
  {
    id: '01F5MYB819Q5D7X3KMXKBCD7AS',
    name: '山梨県庁',
    address: '400-8501山梨県甲府市丸の内1-6-1山梨県庁',
    latitude: 35.6641261,
    longitude: 138.5684246,
    email: 'yamanashi@example.com',
    phoneNumber: '055-237-1111',
    ...shared,
  },
  {
    id: '01F5MYEVE1ZBMAW05YWDNW9CQT',
    name: '岐阜県庁',
    address: '500-8570岐阜県岐阜市薮田南2-1-1岐阜県庁',
    latitude: 35.3911494,
    longitude: 136.722199,
    email: 'gifu@example.com',
    phoneNumber: '058-272-1111',
    ...shared,
  },
  {
    id: '01F5MYHFMHTCEKJMX4DRC15XEZ',
    name: '三重県庁',
    address: '514-8570三重県津市広明町13三重県庁',
    latitude: 34.7303206,
    longitude: 136.5088478,
    email: 'mie@example.com',
    phoneNumber: '059-224-3070',
    ...shared,
  },
  {
    id: '01F5MYJ7NYF1DA35NC7J1CD5AQ',
    name: '滋賀県庁',
    address: '520-8577滋賀県大津市京町4-1-1滋賀県庁',
    latitude: 35.0044608,
    longitude: 135.8685341,
    email: 'shiga@example.com',
    phoneNumber: '077-528-3993',
    ...shared,
  },
  {
    id: '01F5MZ29457YJ8X5CJZ1BXS9VN',
    name: '京都府庁',
    address: '602-8570京都府京都市上京区下立売通新町西入藪之内町京都府庁',
    latitude: 35.0209335,
    longitude: 135.755311,
    email: 'kyoto@example.com',
    phoneNumber: '075-451-8111',
    ...shared,
    description: '府民向けの福祉サービスの相談・受付を行っております',
  },
  {
    id: '01F5MZ7SJ2BD3VXQQM1VY7G12Z',
    name: '大阪府庁',
    address: '540-8570大阪府大阪市中央区大手前2-1-22大阪府庁',
    latitude: 34.6864009,
    longitude: 135.5201285,
    email: 'osaka@example.com',
    phoneNumber: '06-6941-0351',
    ...shared,
    description: '府民向けの福祉サービスの相談・受付を行っております',
  },
  {
    id: '01F5MZ8YZ2JFEYGSM9R92ZS895',
    name: '兵庫県庁',
    address: '650-8567兵庫県神戸市中央区下山手通5-10-1兵庫県庁',
    latitude: 34.690972,
    longitude: 135.1833177,
    email: 'hyogo@example.com',
    phoneNumber: '078-341-7711',
    ...shared,
  },
  {
    id: '01F5MZ9VNHRHKM6PCPVYF66PED',
    name: '奈良県庁',
    address: '630-8501奈良県奈良市登大路町30奈良県庁',
    latitude: 34.6853026,
    longitude: 135.8328645,
    email: 'nara@example.com',
    phoneNumber: '0742-22-1101',
    ...shared,
  },
  {
    id: '01F5MZANNMASVV766JGFVWRCWS',
    name: '和歌山県庁',
    address: '640-8585和歌山県和歌山市小松原通1-1和歌山県庁',
    latitude: 34.22603,
    longitude: 135.167467,
    email: 'wakayama@example.com',
    phoneNumber: '073-432-4111',
    ...shared,
  },
  {
    id: '01F5MZBSEQF6JFT8HDADQA5GDE',
    name: '鳥取県庁',
    address: '680-8570鳥取県鳥取市東町1-220鳥取県庁',
    latitude: 35.5039956,
    longitude: 134.2379897,
    email: 'tottori@example.com',
    phoneNumber: '0857-26-7111',
    ...shared,
  },
  {
    id: '01F5MZCPXJCZ96659WP68W2ANX',
    name: '島根県庁',
    address: '690-8501島根県松江市殿町1島根県庁',
    latitude: 35.4725844,
    longitude: 133.050723,
    email: 'shimane@example.com',
    phoneNumber: '0852-22-5111',
    ...shared,
  },
  {
    id: '01F5MZDFEBTN1VQNZT6AQPG3XX',
    name: '岡山県庁',
    address: '700-8570岡山県岡山市北区内山下2-4-6岡山県庁',
    latitude: 34.6617726,
    longitude: 133.9346752,
    email: 'okayama@example.com',
    phoneNumber: '086-224-2111',
    ...shared,
  },
  {
    id: '01F5MZEEVWA5AAMXJ9WXGDKN2E',
    name: '広島県庁',
    address: '730-8511広島県広島市中区基町10-52広島県庁',
    latitude: 34.3965631,
    longitude: 132.4596281,
    email: 'hiroshima@example.com',
    phoneNumber: '082-228-2111',
    ...shared,
  },
  {
    id: '01F5MZFDPZQY52P8624KKSQ7P7',
    name: '山口県庁',
    address: '753-8501山口県山口市滝町1-1山口県庁',
    latitude: 34.1858925,
    longitude: 131.4707249,
    email: 'yamaguchi@example.com',
    phoneNumber: '083-922-3111',
    ...shared,
  },
  {
    id: '01F5MZG860BF8QQGTZ1SMPAR16',
    name: '徳島県庁',
    address: '770-8570徳島県徳島市万代町1徳島県庁',
    latitude: 34.0656597,
    longitude: 134.5592529,
    email: 'tokushima@example.com',
    phoneNumber: '088-621-2500',
    ...shared,
  },
  {
    id: '01F5MZH0THT6R89JZ4YV7QHRJ9',
    name: '香川県庁',
    address: '760-8570香川県高松市番町4-1-10香川県庁',
    latitude: 34.3401166,
    longitude: 134.0433119,
    email: 'kagawa@example.com',
    phoneNumber: '087-831-1111',
    ...shared,
  },
  {
    id: '01F5MZHTBVJ82A45BZM90MSXM9',
    name: '愛媛県庁',
    address: '790-8570愛媛県松山市一番町4-4-2愛媛県庁',
    latitude: 33.841658,
    longitude: 132.7656604,
    email: 'ehime@example.com',
    phoneNumber: '089-941-2111',
    ...shared,
  },
  {
    id: '01F5MZK1FT34ZDJCDK80S6XRR2',
    name: '高知県庁',
    address: '780-8570高知県高知市丸ノ内1-2-20高知県庁',
    latitude: 33.5597138,
    longitude: 133.5310891,
    email: 'kochi@example.com',
    phoneNumber: '088-823-1111',
    ...shared,
  },
  {
    id: '01F5MZKXRZ99QRQJEQXAW0XZQ6',
    name: '福岡県庁',
    address: '812-8577福岡県福岡市博多区東公園7-7福岡県庁',
    latitude: 33.6063137,
    longitude: 130.4180291,
    email: 'fukuoka@example.com',
    phoneNumber: '092-651-1111',
    ...shared,
  },
  {
    id: '01F5MZMMS52WNFRG897RVZ7HEA',
    name: '佐賀県庁',
    address: '840-8570佐賀県佐賀市城内1-1-59佐賀県庁',
    latitude: 33.2494385,
    longitude: 130.2988042,
    email: 'saga@example.com',
    phoneNumber: '0952-24-2111',
    ...shared,
  },
  {
    id: '01F5MZNDEGN9RD005J5E5WPAH4',
    name: '長崎県庁',
    address: '850-8570長崎県長崎市尾上町3番1号長崎県庁',
    latitude: 32.7503362,
    longitude: 129.8679084,
    email: 'nagasaki@example.com',
    phoneNumber: '095-824-1111',
    ...shared,
  },
  {
    id: '01F5MZP5Z2Q552V8M4G6DT03DQ',
    name: '熊本県庁',
    address: '862-8570熊本県熊本市中央区水前寺6-18-1熊本県庁',
    latitude: 32.7898263,
    longitude: 130.7414779,
    email: 'kumamoto@example.com',
    phoneNumber: '096-383-1111',
    ...shared,
  },
  {
    id: '01F5MZQ568JYXQH19MH01ACDE9',
    name: '大分県庁',
    address: '870-8501大分県大分市大手町3-1-1大分県庁',
    latitude: 33.2381996,
    longitude: 131.6126744,
    email: 'oita@example.com',
    phoneNumber: '097-536-1111',
    ...shared,
  },
  {
    id: '01F5MZR10G72JCPP32S15J334F',
    name: '宮崎県庁',
    address: '880-8501宮崎県宮崎市橘通東2-10-1宮崎県庁',
    latitude: 31.9110306,
    longitude: 131.4238909,
    email: 'miyagi@example.com',
    phoneNumber: '0985-26-7111',
    ...shared,
  },
  {
    id: '01F5MZRW2SR6BYZQ4T0DJK3EYJ',
    name: '鹿児島県庁',
    address: '890-8577鹿児島県鹿児島市鴨池新町10-1鹿児島県庁',
    latitude: 31.5601825,
    longitude: 130.5579681,
    email: 'kagoshima@example.com',
    phoneNumber: '099-286-2111',
    ...shared,
  },
  {
    id: '01F5MZT6VWWYH7X2CW7BX59QXP',
    name: '沖縄県庁',
    address: '900-8570沖縄県那覇市泉崎1-2-2沖縄県庁',
    latitude: 26.2123793,
    longitude: 127.6806877,
    email: 'okinawa@example.com',
    phoneNumber: '098-866-2333',
    ...shared,
  },
  {
    id: '01F5MYC4N30RWRDAQGGN6FY727',
    name: '長野県庁',
    address: '380-8570長野県長野市大字南長野字巾下692-2長野県庁',
    latitude: 36.651282,
    longitude: 138.180972,
    email: 'nagano@example.com',
    phoneNumber: '026-232-0111',
    ...shared,
  },
];