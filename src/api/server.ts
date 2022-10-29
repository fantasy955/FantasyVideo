import { Server, Model, Factory, hasMany, RestSerializer, createServer } from 'miragejs'
import faker from 'faker'
import seedrandom from 'seedrandom'
import { UserInfo } from '/@/redux/interface/index'

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
    category: 'animation',
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

function getVideoArray(limit?: number) {
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
        videos.push({ ...videoTemplate })
    }
    return videos
}

createServer({
    timing: 2000,
    routes() {
        this.namespace = "api"

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

        this.get("/video/hot", (db, request) => {
            const { category, limit, unk } = request.queryParams
            // if (category) {
            //     throw new Error('未实现类别获取')
            // }
            return {
                code: 1,
                data: {
                    list: getVideoArray(Number(limit))
                }
            }
        })
    },
})

