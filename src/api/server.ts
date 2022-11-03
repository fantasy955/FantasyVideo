import { Server, Model, Factory, hasMany, RestSerializer, createServer } from 'miragejs'
import faker from 'faker'
import seedrandom from 'seedrandom'
import { UserInfo } from '/@/redux/interface/index'
import { request } from 'http'

const IdSerializer = RestSerializer.extend({
    serializeIds: 'always',
})


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(rng() * (max - min + 1)) + min
}

let useSeededRNG = false
let rng = seedrandom()

if (useSeededRNG) {
    let randomSeedString = localStorage.getItem('randomTimestampSeed')
    let seedDate

    if (randomSeedString) {
        seedDate = new Date(randomSeedString)
    } else {
        seedDate = new Date()
        randomSeedString = seedDate.toISOString()
        localStorage.setItem('randomTimestampSeed', randomSeedString)
    }

    rng = seedrandom(randomSeedString)
    faker.seed(seedDate.getTime())
}

const userData: UserInfo = {
    id: 123,
    username: 'fantasy955',
    nickname: 'fantasy955',
    email: '1642063542@qq.com',
    mobile: '18569380076',
    gender: 1,
    birthday: '1998-10-24',
    money: 9999,
    score: 9999,
    avatar: '',
    lastlogintime: '2023-10-23',
    lastloginip: '2022-10-23',
    jointime: '2022-10-23',
    motto: '',
    token: 'a940239c-4fb8-49be-b719-97442393e662',
    refreshToken: '',
}

const videoTemplate: Video = {
    id: 1,
    category: { 'Movie': [], 'Animation': [] },
    title: '哆啦a梦',
    region: 'japan',
    poster: '',
    actors: null,
    directors: null,
    releaseDate: null,
    updateDate: null,
    lang: null,  // 语言
    status: null,  // 完结/更新
    description: null,
    related: null,
}

const titleValues = [
    '哆啦A梦', '大蛇对大蟒', '大醉侠', '执法悍将',
    '子弹列车', '异形4', '杀手寓言第二章', '喷火女郎', '铁血战士：猎物', '异形大战铁血战士2', '少女四大名捕',
    '以爱书写爱', '雷霆之爱', '钟鼓楼', '换乘恋爱 第二季', '青春灰姑娘', '毒蛇王后',
    'TheEmpire：法之帝国', '雨伞', '男友降临！', '海军罪案调查处：洛杉矶 第十四季', '王后伞下',
    '夏洛克的孩子们', '三姐妹要勇敢', '家有喜旺 第二季', '30枚硬币 第一季', '犯罪现场调查 第五季',
    '腌黄瓜先生 第四季', '那山那海', '天使追缉令', '少奇同志在武汉', '小镇总理', '上海滩', '李小龙传奇', '大醉侠'
]

const imageUrlValues = [...['https://puui.qpic.cn/vcover_vt_pic/0/mzc00200nihiodp1653963132192/350', 'https://puui.qpic.cn/vcover_vt_pic/0/8r2jok7pmjjdz2a1644306112963/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200xthnfhl1650268002017/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200qna7iuf1646797293622/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200y9c7w7r1646211343396/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200chgdbj81645523590097/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200mf6r8gt1632882590910/350', 'https://puui.qpic.cn/vcover_vt_pic/0/83f689ojtkanuq91638949225254/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200bpfj3571640315111474/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200umgk0741635910803608/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc0020046q4d6r1586318327887/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200ohqz98i1589273382814/350', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200lldrsa61584691562862/350', 'https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/2/2nnk0mjf3bsk6tt_p.jpg', 'https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/s/so8hoirlo0hyumr_p.jpg', 'https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/y/yicbanjo49jesmw_p.jpg', 'https://puui.qpic.cn/qqvideo_ori/0/x0911vo6nas_228_128/0', 'https://puui.qpic.cn/qqvideo_ori/0/f0027eigqfd_228_128/0', 'https://puui.qpic.cn/qqvideo_ori/0/r0027doyobm_228_128/0', 'https://puui.qpic.cn/vcover_hz_pic/0/cl9ioy65y3hxl5u1499221703/226', 'https://puui.qpic.cn/vcover_hz_pic/0/1pa8kofbk9u3gcjt1472445181.jpg/226', 'https://puui.qpic.cn/vcover_hz_pic/0/2ih1wnad4h30y5n1536130799/226', 'https://puui.qpic.cn/vcover_hz_pic/0/7p7i5q9momipthi1536131101/226', 'https://puui.qpic.cn/vcover_hz_pic/0/mzc00200rixaloy1582441063058/226', 'https://puui.qpic.cn/vcover_hz_pic/0/8jjn535nfkc7vtj1483429005/226', 'https://puui.qpic.cn/vcover_hz_pic/0/2sufwfft1xib0oe1483515259/226', 'https://puui.qpic.cn/vcover_hz_pic/0/nah0kcunh9a7dcb1556527189/226', 'https://puui.qpic.cn/vcover_hz_pic/0/l2ygvuz9v1gvvz9t1472452464.jpg/226', 'https://puui.qpic.cn/vcover_hz_pic/0/aihoaq2s1az6rwo1483585259/226', 'https://puui.qpic.cn/vcover_hz_pic/0/mzc00200dr9151x1637547161426/226', 'https://puui.qpic.cn/vcover_hz_pic/0/og82veb4at38v3q1562151699/226', 'https://puui.qpic.cn/vcover_hz_pic/0/gf0u8jyvp2b8kxy1499654162/226', 'https://puui.qpic.cn/vcover_hz_pic/0/kr7lhhd4nl8pada1563103225/226', 'https://puui.qpic.cn/vcover_hz_pic/0/s47gndm8pa7g6qk1561982704/226', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200t8d6rrk1665473003573/220', 'https://puui.qpic.cn/vcover_vt_pic/0/k18dkv9d6d3ra6q1536130114/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200o04csm01651462212987/220', 'https://puui.qpic.cn/vcover_vt_pic/0/7a7unmp057et77o1643183300519/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc002007j5n30l1621236877963/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200i10jq391662443573289/220', 'https://puui.qpic.cn/vcover_vt_pic/0/cl9ioy65y3hxl5u1536130372/220', 'https://puui.qpic.cn/vcover_vt_pic/0/1pa8kofbk9u3gcj1536130559/220', 'https://puui.qpic.cn/vcover_vt_pic/0/2ih1wnad4h30y5nt1444811907.jpg/220', 'https://puui.qpic.cn/vcover_vt_pic/0/201bspkjreikk6u1644305188271/220', 'https://puui.qpic.cn/vcover_vt_pic/0/8r2jok7pmjjdz2a1644306112963/220', 'https://puui.qpic.cn/vcover_vt_pic/0/6ucmnf55jurtrac1554192291/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200elilyq11652669706950/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc002003wholws1651462907060/220', 'https://puui.qpic.cn/vcover_vt_pic/0/7p7i5q9momipthit1464890533.jpg/220', 'https://puui.qpic.cn/vcover_vt_pic/0/d84e196dqlu68tl1644305106288/220', 'https://puui.qpic.cn/vcover_vt_pic/0/6nl6y5e9ci9n4te1573541494/220', 'https://puui.qpic.cn/vcover_vt_pic/0/8jjn535nfkc7vtjt1444763387.jpg/220', 'https://puui.qpic.cn/vcover_vt_pic/0/4wn6a7i254y2vd11644308609077/220', 'https://puui.qpic.cn/vcover_vt_pic/0/5anou5w6l312ak91644306933879/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc002008jwzwyz1644306189147/220', 'https://puui.qpic.cn/vcover_vt_pic/0/2yxtt6efl4ecors1644307448739/220', 'https://puui.qpic.cn/vcover_vt_pic/0/7clyge6mktqwj4p1644306971025/220', 'https://puui.qpic.cn/vcover_vt_pic/0/8ab6sgb0zdrahoi1644475956496/220', 'https://puui.qpic.cn/vcover_vt_pic/0/o1l8clummn1wkryt1465297264.jpg/220', 'https://puui.qpic.cn/vcover_vt_pic/0/bdr1rw4fedjvgbp1653274469369/220', 'https://puui.qpic.cn/vcover_vt_pic/0/hcx1ffsjpj63xuj1565945322/220', 'https://puui.qpic.cn/vcover_vt_pic/0/2sufwfft1xib0oe1556437748/220', 'https://puui.qpic.cn/vcover_vt_pic/0/mzc00200rrjtpvz1648616506916/220', 'https://puui.qpic.cn/vcover_vt_pic/0/0l01jm9yobh4xo41556520274/220'], ...['https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166536792255546207.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-09/166294692600677158.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166653792255693986.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-07/165794832330078191.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166597092344577786.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-09/166306878328645925.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-09/166404132304675733.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166585212261435685.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166590612713353915.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166580892330726554.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166584672544244936.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166550292249867236.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-09/166403772390618775.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2021-10/163314672282975386.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2021-05/162135553524754288.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2021-05/162135280338546288.jpg', 'https://cdn.aqdstatic.com:966/88ys/upload/vod/2021-05/162244920377973393.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2022-10/166601592677069317.jpg', 'https://cdn.aqdstatic.com:966/88ys/upload/vod/2017-12/156465102718259078.jpg', 'https://cdn.aqdstatic.com:966/88ys/upload/vod/2017-12/156483917994206912.jpg', 'https://cdn.aqdstatic.com:966/88ys/upload/vod/2017-12/1564647629112795729.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2021-05/162032670401935688.jpg', 'https://cdn.aqdstatic.com:966/88ys/upload/vod/2017-12/156466594873096472.jpg', 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2021-05/162048330368606350.jpg']]


const actorValues = ['帕查拉·苏岸西', '查隆拉·诺山荣', 'Chayuthn', 'Jameswi郭平', '孟瑾', '刘艳臣',
    '叶仲寅', '吕中李龙真', '郑基石', '金叡园久间田琳加', '本田响矢', '水谷果穂', '萨曼莎·莫顿', '爱丽达·阿察瑞儿',
    '金宣儿', '李美淑', '安在旭金惠秀', '金海淑', '崔元英', '金义城', '高桥海人', '樱井由纪', '田中美奈实', '克里斯·奥唐纳',
    '丹妮拉·鲁阿', '艾金惠秀', '金海淑', '崔元英', '金义城', '井之原快彦', '西野七濑', '玉山铁二', '李荷娜卢卡斯·内夫',
    '克萝丽丝·利奇曼', 'Mafalda', 'Carbonel威廉·彼德森', '玛格·海根柏格', '加Kaitlyn', 'Robrock', '张光北', '奚望沈金兴',
    '洪昭容', '陈秀环郭法曾毕海峰', '严敏求周润发', '赵雅芝', '吕良伟', '刘丹', '汤陈国坤',
    '米雪儿·朗', '雷·帕克赵文卓', '杨恭如', '莫少聪', '杨若兮']

const descriptionValues = [
    '《美女税》为了应对严苛的财政压力，日本政府出台“美女税”，即向那些在现实生活中因为容貌得到不少额外福利的美女征税。美丽的OL爱子（佐佐木希 饰）被征税额高达20%，虽然有些吃不消，她却渐渐为此沾沾自喜。《做梦机器》在现实生活中郁郁不得志的健二（洼田正孝 饰）意外发现母亲是一个机器人，此后他开始意识到周遭种种的不协调，继而意识到绝大多数的都市人都变成了机器人，而他们的本体隐藏在某个角落中。 《通勤军队》因纳豆的缘故，茨城县宣布独立，并与日本政府发生战争。政府高额聘请各界人士担当通勤军人。某武器生产企业的员工（西岛秀俊 饰）阴差阳错加入军队，由此感受到前所未有的活力。《猜谜大叔》不就刚刚在电视上获得“猜谜大王”称号的古贺三郎（高桥一生 饰），某天迎来了意外访客——猜谜大叔（松重丰 饰）。对方源源不断提出各种问题，难道说这就是获奖附赠的一年份猜谜？《世界奇妙物语 2016年春之特别篇》电影于2022年10月29号由88影视网收集自网络发布，同时提供在线观看服务。',
    '无数袭击人类的蚂蚁的出现，使男女主人公体会到什么才是真正的恐怖他们眼睁睁看着自己的同伴遭到袭击，变成白骨。对于这种可怕的生物，任何措施都变成徒劳。昆虫学专家詹姆斯·康拉德在洛杉矶的自然历史博物馆工作。他来到了偏僻的阿拉斯加寻找片刻的安宁。他本想在这期间不在思考任何关于昆虫的问题，但是事与愿违，他卷入了一场生死攸关的灾难之中。他所面临的是他见过的最可怕的昆虫。圭亚那兵蚁大约每隔十年就会出现在地球上，它们拥有着复杂的信息交流系统，巨大的下颚，它们可以轻而易举的吞噬任何猎物。这些蚂蚁的巢穴往往是温暖的南美洲，但是阿拉斯加的火山和地震令这个地区成为了这些自然杀手的新家。它们迅速繁殖，小镇上的人很快就将成为它们的美味佳肴。在小镇附近的河边出现了第一具尸体。詹姆斯也目睹了这一幕。这不仅与詹姆斯的职业有关，在詹姆斯小时候，他的父亲就丧命于这些可怕的蚂蚁中。康拉德和鲍勃·海加尔德、杰弗·克洛瓦和劳拉·西尔组成一个小队，计划拯救小镇。令人绝望的是，队员们一个接着一个的死去。康拉德和劳拉身处险境：他们被逼到了悬崖，身后是汪洋大海，身前就是多的象潮水一般的黑色昆虫。这些杀手即将把这两个人类变成它们下一顿美餐《蚂蚁的袭击 普通话版》电影于2021年11月03号由88影视网收集自网络发布，同时提供在线观看服务。',
    '东森YoYo台最热门卡通《机器战士TOBOT》首度登上大银幕！邪恶博士来袭，竟然将所有人都变成了机器人大军。爸爸陷入危险遭到控制，主角们与机器战士们合作，努力击退机器人大军！ 《托宝兄弟TOBOT 电影版： 机器人军团的攻击》电影于2021年11月03号由88影视网收集自网络发布，同时提供在线观看服务。',
]

const topCategoryValues = ['Movie', 'Animation', 'Series', 'Variety show']

const subCategoryValues: Record<string, string[]> = {
    'Movie': [
        'Action', 'Comedy', 'Science Fiction', 'Drama', 'War', 'Romance', 'Horror', 'Documentary', 'Adventure', 'Suspense', 'Crime', 'Thriller', 'Animation', 'Microfilm', 'Others'
    ],
    'Animation': [
        'Japan'
    ],
    'Series': [
        'Hong Kong and Taiwan'
    ],
    'Variety show': [

    ]
}

function generateRandomActorsArray(): string[] {
    let num = getRandomInt(0, 5)
    let actors: string[] = []
    for (let i = 0; i < num; i++) {
        let t = getRandomInt(0, actorValues.length - 1)
        if (!actors.find((item) => item === actorValues[t])) {
            actors.push(actorValues[t]);
        }
    }
    return actors
}

function generateRandomSubCategories(topCategory: string[]): string[] {
    let num = getRandomInt(1, 5)
    let subCategories: string[] = []
    for (let i = 0; i < num; i++) {
        let top: string = topCategory[getRandomInt(0, topCategory.length - 1)]
        if (subCategoryValues[top]) {
            let sub: string = subCategoryValues[top][getRandomInt(0, subCategoryValues[top].length - 1)]
            if (sub && !subCategories.find((item) => item === sub)) {
                subCategories.push(sub)
            }
        }
    }

    return subCategories
}

function generateRandomTopCategories(): string[] {
    let num = getRandomInt(1, 2)
    let topCategories: string[] = []
    for (let i = 0; i < num; i++) {
        let top = topCategoryValues[getRandomInt(0, topCategoryValues.length - 1)]
        if (!topCategories.find((item) => item === top)) {
            topCategories.push(top)
        }
    }
    return topCategories
}

function generateRandomCategoryTree(): Video['category'] {
    let res: Video['category'] = {}
    let num = getRandomInt(1, 2)
    for (let i = 0; i < num; i++) {
        let top = topCategoryValues[getRandomInt(0, topCategoryValues.length - 1)]
        if (!res[top]) {
            res[top] = generateRandomSubCategories([top])
        }
    }

    return res
}

function getVideoArray(limit?: number, topCategory: string = '', subCategory: string = '', order: string = '') {
    let videos: Video[] = []
    limit = typeof limit === 'undefined' ? titleValues.length : limit
    limit = limit > 0 ? limit : titleValues.length
    for (let i = 0; i < limit; i++) {
        let id: number = i
        let title = titleValues[i]
        let actors = generateRandomActorsArray()
        let img = imageUrlValues[getRandomInt(0, imageUrlValues.length - 1)]
        videoTemplate.id = id
        videoTemplate.title = title
        videoTemplate.actors = actors
        videoTemplate.poster = img
        videoTemplate.category = !topCategory ? generateRandomCategoryTree() : { topCategory: generateRandomSubCategories([topCategory]) }
        // videoTemplate.category = generateRandomCategoryTree()
        videoTemplate.description = descriptionValues[getRandomInt(0, descriptionValues.length - 1)]
        videos.push({ ...videoTemplate })
    }
    return videos
}

const videoSize = 1000

let reqCount = 0

function sleep(n: number) {
    let b = true
    let timestamp = new Date().getTime()
    while (b) {
        if (new Date().getTime() - timestamp > n * 1000) {
            b = false
        } else {
            b = true;
        }
    }
}

createServer({
    routes() {
        this.namespace = "api"
        this.timing = 100* 3
        this.post("/user/signIn", (db, request) => {
            // console.log(request)
            return {
                code: 1,
                data: {
                    id: 123,
                    username: 'fantasy955',
                    nickname: 'fantasy955',
                    email: '1642063542@qq.com',
                    mobile: '18569380076',
                    gender: 1,
                    birthday: '1998-10-24',
                    money: 9999,
                    score: 9999,
                    avatar: '',
                    lastlogintime: '2023-10-23',
                    lastloginip: '2022-10-23',
                    jointime: '2022-10-23',
                    motto: '',
                    token: 'a940239c-4fb8-49be-b719-97442393e662',
                    refreshToken: '',
                },
            }
        })

        this.get("/video/index", async (db, request) => {
            const { topCategory, subCategory, order, limit, page, year, region } = request.queryParams
            const  data = getVideoArray(Number(limit), topCategory, subCategory, order)

            return {
                code: 1,
                data: {
                    list: getVideoArray(Number(limit), topCategory, subCategory, order),
                    currentPage: page,
                    totalPage: Math.ceil(videoSize / limit),
                    total: videoSize
                }
            }

        }, { timing: 100 })

        this.get("/video/detail", (db, request) => {
            const video = getVideoArray(13)[getRandomInt(0, 12)]
            video.id = Number(request.params.id)
            return {
                code: 1,
                data: video
            }
        })
    },
})

