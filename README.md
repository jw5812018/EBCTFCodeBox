<p align="center">
  <img src="./public/icons/logo.png" width="120" height="120" alt="恒烈 CTF 编码工具箱" />
</p>
<h1 align="center">
  <span>恒烈 CTF 编码工具箱 · EBCTFCodeBox</span>
</h1>
<p align="center">
  <span align="center">本地优先、零外发的编解码 / 加解密 / 隐写分析工具箱：795 个注册操作覆盖 23 类能力，绝大多数在浏览器本地运行，Windows 另可启用本地桥能力，macOS / Linux 提供双击启动器。</span>
</p>

![GitHub Repo stars](https://img.shields.io/github/stars/Henglie/EBCTFCodeBox?style=flat-square) ![GitHub License](https://img.shields.io/github/license/Henglie/EBCTFCodeBox?style=flat-square) ![GitHub Release](https://img.shields.io/github/v/release/Henglie/EBCTFCodeBox?style=flat-square)

![GitHub Issues](https://img.shields.io/github/issues/Henglie/EBCTFCodeBox?style=flat-square) ![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Henglie/EBCTFCodeBox?style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/Henglie/EBCTFCodeBox?style=flat-square)

> [!WARNING]
> 本工具仅供 CTF 学习、竞赛与安全研究使用。请勿将其用于任何违法违规、侵犯他人权益或可能给你自己带来麻烦的用途。使用者需自行承担因不当使用产生的一切后果。
> 如果你在使用中发现 Bug、算法结果异常或文档缺失，欢迎提交 Issue，最好附上输入样例、期望输出和复现步骤。

## 目录

- [快速下载](#快速下载)
- [更新日志](#更新日志)
- [项目简介](#项目简介)
- [特点](#特点)
- [界面预览](#界面预览)
- [运行](#运行)
- [平台兼容性](#平台兼容性)
- [性能要求](#性能要求)
- [目录结构](#目录结构)
- [编解码全清单](#编解码全清单788-ops--23-分类)
- [插件与 AI 接入](#插件与-ai-接入)
- [开源协议](#开源协议)
- [第三方资源与许可](#第三方资源与许可)
- [隐私](#隐私)

## 快速下载

> 核心处理本地运行、零外发。下载解压后双击 `通用点我启动.py` 即可使用（需本机有 Python 3）。Windows 可启用本地桥，macOS / Linux 自动跳过桥接能力。

| 网盘 | 链接 | 提取码 |
|---|---|---|
| 百度网盘 | https://pan.baidu.com/s/1Uqq_ONMBG9qA0dJvUG53Og?pwd=0000 | 0000 |
| 夸克网盘 | https://pan.quark.cn/s/3b7e573b19c0 | 无 |

当前版本 **v0.1.8-beta3**。源码始终以 GitHub 仓库为准：[github.com/Henglie/EBCTFCodeBox](https://github.com/Henglie/EBCTFCodeBox)。

## 更新日志

## v0.1.8

### 新增功能

【F5 隐写双向】F5（f5stegojs 系）JPEG 隐写升级为编/解双向：encode 用密钥把消息经 (1,2^k-1,k) 矩阵编码写入亮度 DCT 系数并重打包 JPEG（与原版 f5stegojs 嵌/提互通，显式 k 或自动选档），decode 侧既有提取、容量诊断与 flag 命中不变；旧配方里 run 节点自动按提取执行。

【PCM 波形变换】新增 pcmTransforms：WAV 整数 PCM（8/16/24/32 位）五档逐样本变换——声道差 L-R（宽域计算，输出 32 位 WAV 并报告饱和计数）、一阶差分、波形反相、时间倒放（保持原格式重建 WAV）与阈值位流（逐样本 / 分窗取 max，LSB-first 打包 + 游程统计），与 numpy 独立期望逐样本对拍；IEEE float 与压缩格式显式拒绝。

【OLE/CFB 容器静态提取】新增 oleExtract：解析 OLE2 复合文档（.doc/.xls/.ppt/.msi/vbaProject.bin）目录树，FAT 与 MiniFAT 双通道取流，流内容原字节下载（SHA-256 对拍），静态只读绝不执行宏。

【字节保真解码】解码时不再把非法字节静默换成“乱码字符”。非 UTF-8 字节统一改成 `\xNN` 转义呈现——人类一眼能判、可以原样复制进下一次解码；同时附原始字节文件供下载。Base 家族、字节变换、流密码、AES 解密等 60 余个解码出口接入同一套字节契约。

【数值转图像】新增「数值 → 图像」原语：给一组 RGB 三元组、坐标点集、标量网格或位流，直接出图。支持行主序与列主序两种扫描、宽度自适应，与参考图逐像素 100% 一致。

【读图扫码】新增图片二维码识别，截图直接拖进来就能出内容；配合「数值转图像」可以把坐标类题目一路做到扫码出结果。

【摩斯音频】摩斯电码音频双向：音频文件拖进来直接出报文，文字或点划串也能编成 WAV 音频（可下载）。解码结果后自动附「再解一层」参考，摩斯解出的中间串是下一层编码时不用再手工接一次。

【流量可读结论】新增流量包人话结论：拖入 pcap / pcapng 自动识别键盘报告、鼠标报告、坐标数据、MQTT 与内嵌文件载荷，直接给出结论和命中的线索原文。

【宽高修复直出下载】拖入被截断宽高的 PNG / JPEG，自动识别并给出修复后的图片下载，不再用手算宽高。判别门槛经过双向回归，正常照片不会被误报。

【组合键还原】流量里的组合键按权威标准还原：Ctrl 组合按 ASCII 控制字符、Alt 组合按终端 ESC 前缀、GUI 组合不产生字符。报告新增「组合键还原行」，看得出是哪个键、怎么按的。

【目标特征编辑器】一键解码的目标特征改成与密钥输入框同款的框内标签编辑器：一个标签就是一条匹配表达式，支持字面与正则、增删改停用与持久化；正则走有界执行引擎，非法表达式给明确报错，不会卡住。

【能力分类重构】导航分类从 19 类细化为 23 类：隐写按语义拆为文本隐写与文件隐写、图像结构与元数据归图像、文件本体归介质类，合并操作与成员不跨类。

【操作清单重构与合并】继续按权威工具清单交叉对照补齐编码映射、压缩校验、工程编码与密码学算法（含 Beaufort 变体、ObjectId 时间还原、RC4-drop、XSalsa20 等），全部过权威对拍；此后经历隐写分类重构与二维码合并入口，现共 784 个注册操作。

【音频与位流一键配方】新增三张一键配方：摩斯音频直出 Base32 明文、DTMF 拨号音直出按键序列、0/1 位流自动推边长折成二维码再扫码。配方链头现在支持直接拖入文件，音频和二进制题不用先手工转文本。

【反色二维码】整幅反色的二维码此前整链解不出，现在能定位、采样并解出内容；正色图的既有链路行为不变。

【原生启动器控制面板】双击启动器不再一闪即关：端口被占时改为进入常驻控制面板，把原因摆出来，可按 2 清除占用端口（先点名进程与 PID 并要求确认）、按 1 重启服务；另有本地桥设置、浏览器打开与状态刷新。Windows 下菜单可直接鼠标点击，也可输入序号回车。通用版 Python 启动器（`点我启动.py`）已对齐同一套指令与文案，只有平台特色不同（Python 版为行式输入）。

【Linux / macOS 双击启动】新增 Linux 与 macOS 启动器：`Linux点我启动.sh`（KDE 双击 / GNOME 右键运行）与 `macOS点我启动.command`（Finder 双击即在终端打开控制面板），二进制为同一套 C 源码交叉编译（Linux x86_64 与 macOS universal2 双架构），控制面板同为 6 条指令，本地桥 / MCP / pyc 反编 / 环境探测全可用；Windows 专属的 GUI 工具拉起与系统强调色自动降级提示。

【素数判定与筛选】新增 primeInspector：给一个大整数逐项判定「特殊身份」并给出依据——梅森素数（Lucas-Lehmer 专用检验）、孪生素数、索菲·热尔曼素数、安全素数、费马素数、强素数、p−1/p+1 光滑（Pollard 攻击口径）；也可按区间或位数批量筛选满足条件的素数，每条结果附判定理由，长扫描带时间预算与结果上限、可中止。

【重运算显式触发 + 不卡界面】23 个重运算操作（素数生成、字典爆破、密钥派生等）不再随输入逐键自动运行——参数框显示提示、点「转换 / 解码」才跑；执行走独立线程（Web Worker），运行中界面保持流畅可点，带读秒与取消按钮，30 秒超时真正中止计算（原来只是丢弃结果但仍在后台算完）。

【二维码合并入口】「二维码图片扫描」与「QR 结构解析」合并为一个「二维码扫描解析」：粘贴图片自动扫描、粘贴文本矩阵自动解析；旧入口的深链、收藏与配方自动兼容。功能全保留：定位符被抹掉的图仍能走网格重建 + 穷举 + 擦除纠错解出。

【键鼠轨迹真彩图】流量取证里的鼠标轨迹不再用字符画，改为真彩色 PNG（沿绘制时序深蓝→红渐变、左键按下标方框），键盘新增打字节奏图（按键间隔着色），可直接下载；同一文件重复分析结果逐字节一致。流量取证同步收敛到新手题必需能力，超出的深度分析如实标注边界。

【哈希爆破外部工具优先】哈希字典爆破、彩虹表查询、HMAC/PBE/JWT/ZIP 弱口令爆破等明确标注为「小字典演示」：本工具只做弱口令快速验证，正式大规模爆破在说明中直接指路 hashcat、John the Ripper、CrackStation 等开源工具与公开彩虹表。

【一键解码排序改进】候选准入新增声明式字符定义域（越界输入不再进入候选）；解码结果新增结构化有效信息识别（URL / 邮箱 / JSON / 凭证块 / 厂商密钥前缀等有限加分，合计封顶低于 flag 权重，flag 与目标特征排序永不被翻转）。

【WaterMarkH 频域隐形水印（内置）】老牌水印工具 WaterMarkH 的算法完整内置，不必再开它的 exe。水印藏在频域、肉眼不可见；提取时输出幅度谱图，文字在图上浮现——实测直接解出样本里的 flag。比原工具多：图案可用文字（多行）或图片、位置字号可调，提取支持自动增益与压制镜像副本。

【盲水印图片模式】DWT-DCT-SVD 盲水印补上图片水印：嵌一张灰度图，提取时给出宽×高即可还原。同时补上此前缺失的水印序列口令一层（错口令解出的结果是错的，可判别）。

【数论 / 谜题两个插件】可选插件，不占内置操作数：数论八件（分解、约数、φ、模逆、中国剩余定理、莫比乌斯、Miller-Rabin、连分数）与谜题五件（数独、24 点、N 皇后、幻方、Mastermind）。对标 dCode 对应板块，名称带 2026-09 年月戳便于日后对照。

【工业级扫码引擎 ZXing】内置 ZXing-C++ 扫码引擎（WASM 版，与主流扫码库同源）：半色调网点二维码、多枚平铺、二维码叠插画等此前解不出的图现在直接出结果，32 张实测样本的可解数从 19 提到 26。扫码范围可选放开到条码全家桶（Aztec、DataMatrix、PDF417、Code128 等 12 种符号一次全出），放开后二维码结果仍排最前。拖图智能识别与扫码操作走同一条链，两处结论一致。连带修掉自研扫码链四个缺陷：稳健外接框被稀疏模块行切断、网格原点卡在整像素（补半像素搜索）、抗锯齿图模块取值成片翻错、纠错擦除超容量就把整图判死。

【JPEG 双算法隐写（OutGuess / steghide）】两大经典 JPEG 隐写工具完整内置（本地 WASM 单线程引擎，纯前端零外发）：OutGuess 按统计保持 DCT 系数直方图特性，支持口令；steghide 0.5.1 支持口令派生加密与可选压缩，另可嵌 WAV 样本 LSB。steghide 载荷无独立认证标签，界面如实提示「取出 N 字节」而不宣称「口令正确」。

【GIF 载荷重排（GifShuffle）】gifshuffle 算法内置：把消息藏进 GIF 调色板排序里，图像肉眼无变化；双向，带口令混淆，与原工具数据格式互通。

【音频 LSB 嵌入】新增 WAV 音频 LSB 载荷双向（audioLsbEmbed）：把任意字节（含二进制文件）嵌入样本最低位，产物可直接下载；与音频隐写检测链配套。

【pcap 字段提取】新增逐包字段提取/过滤（pcapFieldExtract）：ip.id / TTL / TCP urgent pointer / DNS qry-answer / dns.txt 等字段逐包抽取，支持协议与方向过滤（src:/dst:/port=），输出表格 / TSV / 纯值三档——纯值可直接接 TTL 隐写解码，附带 TCP 重组乱序/重传/缺段诊断。

【FTP 对象提取】新增 FTP 控制/数据流配对（ftpExtract）：从 pcap 里解析 USER/PASS/PORT/PASV/EPSV/RETR/STOR 命令与应答，按五元组配对数据连接，导出传输文件原字节（SHA-256 对拍）。主动/被动/扩展被动、多会话、ASCII/二进制都标注，缺段显式报告。

【TLS1.2 已知密钥还原】新增 tlsDecrypt：配合 NSS keylog（浏览器 SSLKEYLOGFILE 的 CLIENT_RANDOM 行）离线解密 TLS1.2 + AES-128-GCM 抓包，导出双向明文（SHA-256 对拍、GCM 认证全验）。错会话的 keylog 显式拒绝零产物；TLS1.3 / CBC 套件 / 无密钥场景如实说明不可解。

【WPA2 握手校验与 CCMP 解密】新增 wpaDecrypt：离线解析无线抓包，判定 EAPOL 四次握手，用已知 SSID+口令派生 PTK 校验 MIC——口令对错给确定性结论；对了才把 CCMP 数据帧认证解密并重建经典以太网 pcap，可直接接回本箱流量分析链。TKIP/WEP/WPA3 显式拒绝，不调网卡、不注入。

【哈夫曼编解码】新增通用 huffmanCodec：频率档（输入统计或权重表 → 确定性 canonical 码）与用户码表档双向编解码，位流以 hex+bitLen 双值交付；拒绝非前缀码/截断/未知符号，与独立参考实现逐位对拍一致。

### 修复 BUG

【二进制明文拿不到】流密码与 AES 等解密结果被硬编码按 UTF-8 读出，RC4 / XOR / AES 等的二进制明文永远拿不到。现在原样交回字节，并给出转义文本与可下载产物。

【解码静默丢字节】十六进制等解码遇到非法字节会静默替换、永久丢字节（`8950ff80` 三字节全丢，而 `8950` 正是 PNG 魔数）。现已按字节保真契约处理。

【拨号音假按键】DTMF 音频里 0.8~1.5 秒的宽带底噪被逐窗判成按键，5 个真键被淹没成 14 位假串。现在按五道闸判定（双音占比、频率独占、绝对电平、最短时长、同键空隙自适应合并），输出与独立实现一致，宽带底噪与单音噪声均被正确拒绝。

【流量假 flag】键盘流量里 Ctrl 组合键被当成裸字母：`Ctrl+C` 在明文里就是裸 `c`，会在花括号里混进字符、造出假 flag 并被高置信置顶。现在修饰键参与字符生成，flag 判据同步排除控制字符，并拦住“控制字节把单词劈开”的形态——宁可漏报也不假报。

【界面可访问性】修复一批无障碍缺陷：移除 4 处忽略系统“减少动效”偏好的硬编码、补齐 5 处 aria 标注、对齐弹层动效时长；七个弹层统一键盘焦点圈定与关闭后归还触发元素，遮罩关闭统一为按下即关并拦住“弹窗内按下、遮罩上抬起”的误关，关闭钮尺寸统一到 36px（触控设备仍 44px）。

【盲水印读不了 JPEG】两个盲水印操作此前任何非 PNG 图片都读不进去，还一律误报“需浏览器环境”——根因是位图关闭后才读宽高，读数归零。修复前 JPEG / BMP / GIF 载体在这两个操作上 100% 不可用。

【数字分解卡死（插件）】数论插件的分解在半素数上长时间不返回（判素与分解都无上限），现改为 Miller-Rabin 判定 + 有界 Pollard rho。

【中国剩余定理算错（插件）】同余方程组每项误先取了模，`x≡2(3)、x≡3(5)、x≡2(7)` 解出 7 而非 23；现累加完整乘积并附逐条回代校验。

【LSB 单独用不出结果】LSB 像素隐写读取时按自家「前 32 位存长度」的格式理解图片，遇到存的是原始文本流的图会把长度读成天文数字然后静默返回空。现在读不通会自动退回原始位流提取干净可读前缀；仍不成则给出带实测数字的明确报错，不再一声不吭。

【PixelJihad 全部不可用】内置加密库的包装层有变量遮蔽缺陷，模块导出恒为空——PixelJihad 的编码与解码在现有构建里 100% 抛「缺少依赖」，此前从未被发现。修复库挂载后，再把「口令错误」与「图内没有载荷」从同一种静默空串拆成各自明确的报错：长度头是多少、AES 认证是否未通过，分阶段说清楚。

【7z 列表输出被吞】7z WASM 引擎的输出捕获自始无效（emscripten 初始化时绑定输出、事后覆盖不生效），压缩包列表一直显示为空。改为初始化时装载可切换输出通道后，RAR5/RAR4/tar/XZ/bzip2 的列表与解压全部恢复；解压前先清输出目录，防止上个包的残留文件串包。

【字符集编码链头静默错值】把字节文件直接拖进 GBK/Big5/Shift-JIS 等字符集的编码方向，会把 hex 字符串再当文本编码，产出看似合法实则无意义的错值。现在编码方向收到真字节先按严格 UTF-8 取回文本，取不回就显式拒绝并指路解码方向。

【配方链多文件静默丢弃】上游产物含多个文件且文本恰好等于其中一个文件的编码时，配方链会静默只取那一个继续串，其余文件悄悄丢掉。现在多文件产物显式拒绝串链，提示先下载所需文件再另起配方。

【穷举解码卡死界面】一键解码与穷举页的全量扫描在主线程同步执行，8 字节小输入就能卡住界面十几秒。现改为逐操作走独立线程执行、单操作 5 秒超时真正中止、异常自动回退主线程重跑保结果口径，界面全程可点。

【后台任务生命周期】快捷键触发的运算与页面切换路径绕过线程通道、切换页面不取消在途任务，导致超时后 CPU 仍在空转。现在相关入口统一走可取消通道，切页即终止在途计算。

### 优化功能

【分类导航】分类细分后导航更贴实际使用场景，同类算法更好找。

【科普同步】科普卡的原理与公式跟随行为同步改写（如组合键参与字符生成的判据），避免文案与行为不一致。

【目标编辑器契约】目标标签从旧的三件套改为单一框内标签编辑器后，配置与界面的数据契约做了统一校验，旧配置未经明确启用不会自动执行。

【底层收敛】位流与字节互转、PNG 逐块循环冗余校验、图像到符号的检测采样三处原语统一为共享实现，原先散落的重复代码合一。经逐字节对拍确认行为不变（含 60 组位平面扫描组合、真 PNG 逐块校验值），注册操作数与既有功能零回归。

【本地桥工具退场】WaterMarkH 已完整内置，其 exe 与本地桥启动条目一并移除，少一个要手动开窗口的外部程序；其余闭源 GUI 工具仍保留本地桥方式。

【与 dCode 的功能对照】完成与 dCode.fr 的逐条对照：密码学可比 151 条、已有对应 94 条；余下按“是否服务真题通关”分层——该补约 18 条（首位是通用单表替换求解器），明确不做约 20 条（娱乐语言、需巨型词典、聚合页非算法）。

【科普与别名同步】新增操作补齐科普分片与别名（全库达标）；随本地桥工具退场移除其科普分片。

【验收工具修正】科普示例核验脚本原先硬编码浏览器版本，版本不匹配时会静默退出并报成功；现改为自动发现，找不到即明确失败。

【单表替换求解器重写】爬山内核换为「穷举对序 + 扰动重启」的迭代局部搜索，英语语料从 1.6K 字符扩到 36K（8 部公版名著均匀取样）：200 字母密文 × 20 组随机密钥全数破解，旧内核同类场景基本全败。新增「已知映射」参数——人工确认的字母可锁定（如 XH=TH），显著加速收敛；结果报告附重合指数供自校对；默认参数在浏览器内约 1 秒出结果。

【归档统一入口升级】压缩/归档识别入口打通 RAR5、RAR4、tar、xz 的真解压（7z 引擎按内容魔数自动推扩展名），bzip2 改纯 JS 主路径、7z 兜底，与 Python bz2 解码逐字节一致；加密包失败时不再产出半解文件。

【PNG 结构能力补全】PNG 压缩文本（zTXt/iTXt 压缩档）稳定解码不再依赖可选外部库；新增逐块原字节导出（含长度+类型+CRC）、PLTE/tRNS 字节与调色板索引位流导出（任意 IDAT 分块天然支持）；图像结构分析新增「PNG 调色板」小节。

【pcapng 块级修复】流量文件修复工具补上 pcapng 支持：按块链遍历与字节序评分，对 SHB 魔数损毁、BOM 损毁、块长度失配等五类有据损坏做字节级精确修复（修复后与原包逐字节一致），歧义损坏只诊断不动字节；经典 pcap 行为零改动。

【内容型操作字节通道补全】URL / 引用打印 / UU / XX / yEnc / BinHex / hexdump / data URI 等 12 个编码操作与 GBK / Big5 / Shift-JIS / EUC-KR / Latin / EBCDIC / UTF-16 共 7 个字符集解码操作接入字节保真契约：链头拖入二进制文件可以直接编码或按目标字符集解读，全部经 Python 独立实现对拍。

## 项目简介

`恒烈 CTF 编码工具箱`（EBCTFCodeBox）是一个以 CTF 场景为入口、面向通用编解码与密码学需求的本地优先工具箱。

它把编码、古典密码、现代加密、哈希校验、进制转换、密码分析爆破、隐写图像等能力汇聚到一个页面里。核心计算在浏览器本地完成，不上传用户输入；Windows 可选启用本地桥。目标是兼顾赛场解题、密码学学习与日常工具需求。

核心设计：

- 原生 ES module，无框架、无构建步骤
- C / emscripten 编译的 WASM 承担高性能算法
- Material 3 温和红主题，暗 / 亮色切换
- 内置天珩全字库，冷僻字符照样显示
- 20 种语言

---

## 特点

- **本地优先 · 零外发**：原生 ES module，无框架、无构建步骤。核心编解码在浏览器本地执行，不上传用户输入；「外链」只生成 URL。PWA 更新仅下载本站资源，本地桥只访问 `127.0.0.1`，外部 AI 仅在用户主动配置 endpoint 后启用。
- **一把梭智能解码**：粘贴或拖入内容，自动识别可能的编码链并给出候选解码结果，支持 crib 目标特征过滤与深度爆破。
- **788 个注册操作 · 23 分类**：覆盖 Base、文本传输、花式 CTF、深奥编程语言、中文本土、古典密码、现代加密（分组 / 流 / 非对称 / 其他）、哈希校验、进制字符集（含素数判定与筛选）、分析爆破、密码攻击、压缩归档、口令与归档破解、取证流量、文件格式结构、数据结构、图像与二维码、音频音视频、隐写及 4 个可选 Windows GUI 桥入口。完整清单由 registry 自动生成。
- **解码强度四件套**（v0.1.2）：强度档位 + 自定义算法池 + **暴力爆破独立通道**（XOR/凯撒/字典/彩虹表/HMAC/PBE/Playfair/ZIP/CRC32/bkcrack，结果单独归组展示不污染主排序）+ **解析层数 1~3 选择**。
- **宽松判定模式**（v0.1.2）：增强/极强/最强/自定义档只按字符种类数放行算法，变体编码题（「喵呜」表 0/1、emoji 表二进制）也能参与解码；默认/快速档保持严格定义域识别。
- **密钥+密文一键尝试**：给定密文与密钥，自动枚举 AES/DES/3DES/RC4/XOR/Fernet × 多种模式 × 多种编码组合。
- **文件拖入分析**：拖入文件自动检测类型、附加数据、图像宽高异常等。
- **全 Unicode 显示**：内置天珩全字库，按 Unicode 平面按需加载，生僻字、古文字、Emoji 均可正常显示。
- **Material 3 温和红主题**，暗/亮色切换，20 种语言。

> 想看完整的功能介绍与场景演示，见 [`介绍文章.md`](./介绍文章.md)。

## 界面预览

<p align="center">
  <img src="介绍图片/一把梭界面.png" alt="一把梭 · 智能解码" width="80%" />
</p>

<p align="center"><i>一把梭 · 智能解码：粘进去自动识别编码链并给出候选结果</i></p>

<p align="center">
  <img src="介绍图片/解析文件演示.gif" alt="文件解析演示" width="80%" />
</p>

<p align="center"><i>拖入文件自动识别类型 + 剥离附加数据</i></p>

<p align="center">
  <img src="介绍图片/配方链演示.gif" alt="配方链演示" width="80%" />
</p>

<p align="center"><i>配方链：把多个算法串成一条可视化流水线</i></p>

<table>
  <tr>
    <td><img src="介绍图片/编码图片.png" alt="图形编码图鉴" /></td>
    <td><img src="介绍图片/Edu演示.png" alt="密码学教学科普卡" /></td>
  </tr>
  <tr>
    <td align="center"><i>图形编码图鉴 · 253 张对照表</i></td>
    <td align="center"><i>每个算法附带 edu 科普卡</i></td>
  </tr>
  <tr>
    <td><img src="介绍图片/关于页面-白.png" alt="亮色主题" /></td>
    <td><img src="介绍图片/关于页面-暗.png" alt="暗色主题" /></td>
  </tr>
  <tr>
    <td align="center"><i>亮色主题</i></td>
    <td align="center"><i>暗色主题（Material 3 昼夜切换）</i></td>
  </tr>
</table>

## 运行

纯静态，任意静态服务器即可。推荐用附带脚本（双击或命令行）：

```bash
py 通用点我启动.py     # Windows（用 py，不用 python3）
python3 通用点我启动.py # macOS / Linux
```

脚本会同时起静态服务器 + 本地桥（bridge.py，固定 8181，仅 Windows 有实际能力），并用系统默认浏览器打开。桥在同进程后台线程内运行，不弹第二个窗口。

### Linux / macOS 双击启动

与 Windows 的「双击 exe 启动」对等。根目录只放**双击入口**，二进制内核收在 `bin/` 子目录（避免误点）：

| 文件 | 平台 | 用法 |
|---|---|---|
| `macOS点我启动.command` | macOS | Finder 里**双击**它 → 自动打开「终端」并进入控制面板 |
| `Linux点我启动.sh` | Linux | KDE（Dolphin）直接**双击**；GNOME（Nautilus）右键 → 运行（或属性里勾选「允许作为程序执行」后双击） |
| `bin/macOS启动器` | macOS | universal2 单文件（Apple Silicon + Intel 双架构），由上面的 .command 调起，无需直接点击 |
| `bin/Linux启动器` | Linux | x86_64 ELF，由上面的 .sh 调起，无需直接点击 |

- macOS 用 `.command` 是因为 Finder 双击裸二进制不会打开终端；Linux 各桌面对裸二进制双击行为不一致，`.sh` + 可执行位是通用做法。
- **首次使用**：解压后双击无反应先赋一次执行权限（`chmod +x macOS点我启动.command bin/macOS启动器 Linux点我启动.sh bin/Linux启动器`）；启动器未签名，macOS 首开被 Gatekeeper 拦时在「系统设置 → 隐私与安全性」点「仍要打开」或右键 → 打开。
- **功能与 Windows 一致**：同一套 C 源码，控制面板同为 1 重启服务 / 2 清除占用端口 / 3 本地桥设置 / 4 打开浏览器 / 5 刷新状态 / 0 退出（Linux/macOS 为键盘行式菜单，无鼠标点击与悬停高亮，属终端能力差异）；本地桥、MCP、pyc 反编、环境探测全可用。Windows 专属的 GUI 工具拉起与系统强调色在这两个平台自动降级提示。两份产物已过静态验收（架构/链接依赖/分支指纹/端点串），真机运行验收按 T547/T548 持续进行。

或直接用任意静态服务器指向项目根目录。首版无需 build，改完刷新即生效。

### 无 Python 部署

本项目是纯静态资源，任意 HTTP 服务器均可托管（ES module 要求 http(s) 环境，不能直接双击 `index.html` 用 file:// 打开）。无 Python 或不想用启动脚本时，任选其一：

```bash
npx serve .                    # Node.js（任选端口）
python3 -m http.server 8180    # 已装 Python 3 但不想用启动脚本
php -S localhost:8180          # PHP 内置服务器
```

nginx / Apache / Caddy 等正式 Web 服务器同样可用，需注意两点：

1. `.wasm` 必须以 `application/wasm` MIME 送出，否则浏览器拒收流式编译。
2. 多线程 WASM（如 bkcrack 的 pthread 产物）依赖 `SharedArrayBuffer`，要求下发跨源隔离头：

   ```
   Cross-Origin-Opener-Policy: same-origin
   Cross-Origin-Embedder-Policy: require-corp
   ```

   附带的 `通用点我启动.py` 已默认下发这两个头；自建服务器需自行配置。缺失这两个头时，多线程 WASM op 会优雅降级或提示不可用，纯前端功能不受影响。

PWA 已完整接线（`manifest.json` + `sw.js`）：首次在线访问后预缓存 709 项核心运行资源（版本更新时按校验和增量补下，只传有变化的文件），支持安装到桌面和核心功能完全断网运行；大体积按需资产（天珩字库四平面、WASM、IDS 拼字数据、编码对照图、KaTeX）首次用到后即缓存、之后同样离线可用。顶栏“检查更新”会下载完整新版本后再询问刷新。

## 平台兼容性

| 平台 | 前端功能 | 本地桥（exe 工具） | 启动方式 |
|---|---|---|---|
| Windows | 全功能（主平台） | JPHS / OpenPuff / OurSecret（GUI 启动）+ pyc/exe 本地反编 + 系统强调色同步 | `py 通用点我启动.py` |
| macOS | 全功能 | 不可用（无 .exe），桥自动跳过，相关 op 灰置提示 | 双击 `macOS点我启动.command`，或 `python3 通用点我启动.py` |
| Linux | 全功能 | 同 macOS，桥自动跳过 | 双击 `Linux点我启动.sh`，或 `python3 通用点我启动.py` |
| ChromeOS | 全功能（经 Crostini Linux 容器） | 同 Linux | `python3 通用点我启动.py`（Crostini 内） |
| 鸿蒙 / Android / iOS | 全功能（PWA，触屏响应式） | 不可用（移动端无法运行 exe） | 浏览器打开部署地址，可选「添加到主屏幕」 |

说明：
- 「本地桥」指 `bridge.py`（端口 8181，仅 Windows）提供 GUI 启动、pyc/exe 反编与系统强调色等本机能力。桥不可用时，浏览器本地能力仍正常，依赖桥的入口会降级提示。
- 移动端 / 鸿蒙经 PWA 安装后可离线使用；字库 / WASM / 图鉴等大资产按需缓存，首次使用时在线加载一次。
- 桥只监听 `127.0.0.1`，绝不外发，恪守零外发红线。

### 浏览器要求

需支持 ES module、WebAssembly、Web Workers、Service Worker、Web Crypto API、DecompressionStream 的现代浏览器：

- Chrome / Edge 90+
- Firefox 113+
- Safari 16.4+

## 性能要求

本项目核心为纯前端应用，常规计算在浏览器本地完成，无服务端算力依赖；少数 Windows 本地桥能力另行注明。以下为各维度的要求与建议：

| 维度 | 最低 | 建议 | 说明 |
|---|---|---|---|
| CPU | 单核 | 4 核+ | Web Worker 池线程数 = `min(8, navigator.hardwareConcurrency)`，多核可加速爆破 / 大文件分片运算 |
| 内存 | 512 MB | 1 GB+ | 天珩全字库与 WASM 按需加载，大文件分析视文件大小线性增长 |
| GPU | 不需要 | 启用硬件加速即可 | 无 GPU 计算，浏览器合成层走 GPU 加速可改善滚动 / 动画流畅度 |
| 磁盘 | 预留 100 MB+ | 同左 | 代码、字库、WASM 与图鉴会随版本增长，以实际发行包为准 |
| 网络 | 首次加载需连接 | 稳定连接 | 不上传用户输入；PWA 安装后核心功能可离线 |
| OS 位数 | 32 位可用 | 64 位 | 64 位浏览器可寻址更大内存，利于大文件分析 |
| 架构 | x86 / x64 / ARM 均可 | 同左 | 浏览器抽象底层架构，WASM 跨架构运行 |

WASM 多线程（`SharedArrayBuffer`）需跨源隔离头（COOP/COEP），`通用点我启动.py` 已默认下发；缺失时多线程 op 降级为单线程或提示不可用，不影响其余功能。首屏使用 HTTP/1.1 keep-alive、ES module 入口前置和字库懒加载；完整离线资源由 Service Worker 在页面加载后后台安装。

## 目录结构

```
index.html          入口
src/
  main.js           UI 驱动（注册表声明式渲染）
  core/             算法层（纯函数，每个模块自注册进 registry）
  ui/               样式 + 图标 + 字体加载
  i18n/             20 种语言文案（中英静态主表 + 18 动态分片，含 RTL 与四门民族语言）
public/
  icons/            Material Symbols Rounded 图标（SVG）
  fonts/th/         天珩首屏子集 + 4 平面 WOFF2
参考/              算法码表核对资料 + 研究成果
```

## 编解码全清单（788 ops · 23 分类）

> 本节由 `node tools/gen_readme_ops.mjs` 从主入口真实 import 闭包生成；opId 即注册表唯一标识。

### Base 系列（30 ops）

| opId | 名称 | 说明 |
|---|---|---|
| base16 | Base16 / Hex | 十六进制编码（支持自定义码表） |
| base32 | Base32 | RFC 4648 / base32hex / Crockford / z-base-32（支持自定义码表） |
| base36 | Base36 | 大整数 0-9a-z |
| base45 | Base45 | RFC 9285（QR 码常用） |
| base58 | Base58 | Bitcoin / Flickr / Ripple / 自定义字母表 |
| base62 | Base62 | 0-9A-Za-z（支持自定义码表） |
| base64 | Base64 | 标准 / URL-safe（含 base64url，可选 padding）/ 自定义码表 |
| base85 | Base85 / Ascii85 | Adobe Ascii85（<~ ~> 包裹，z 压缩零组） |
| base91 | Base91 | basE91（支持自定义码表） |
| base92 | Base92 | 13 bit 分块（支持自定义码表） |
| base100 | Base100 | emoji 编码（每字节 → U+1F3F7 + b） |
| radixN | 任意进制 | 文本 ↔ N 进制大整数（N = 2..95，可自定义码表） |
| baseCustom | 自定义字母表 Base | 用户填字母表，进制 = 字母表长度 |
| base58check | Base58Check | Base58 + 双 SHA-256 4 字节校验（比特币地址校验） |
| radix64 | Radix64 (crypt) | 密码 crypt 表 ./A-Za-z0-9（位打包，无 padding） |
| base69 | Base69 | pshihn 7 字节分块（含 padding 标记） |
| z85 | Z85 (ZeroMQ) | ZeroMQ Base85 字典式（4 字节 → 5 字符） |
| base85ipv6 | Base85 IPv6 | IPv6 码表 Base85 变体（RFC 1924） |
| base2048 | Base2048 | qntm 11-bit 编码（Unicode 紧凑表示） |
| base65536 | Base65536 | 每 2 字节 → 1 CJK 字符（Unicode 紧凑表示） |
| ecoji | Ecoji | 1024 emoji 表 + padding（5 字节 → 4 emoji） |
| base64steg | Base64 隐写 | base64 padding 比特隐写（多行，藏/取隐藏信息） |
| base32steg | Base32 隐写 | base32 padding 比特隐写（多行，末字符冗余位藏信息，照 base64steg 偏移法复刻） |
| base64dict | 凯撒自定义字典 Base64 | 用 64 字符自定义字典替换标准 base64 字符 |
| multilineBase64 | 多行 Base64 | 多行 base64 解码 / 按行切分编码 |
| base64decompress | Base64 + Zlib | base64 ↔ zlib 压缩（浏览器 DecompressionStream） |
| crockford32 | Crockford Base32 | 人类可读 Base32（排 I/L/O/U，o→0 i/l→1 容错，- 忽略；可选 mod 37 校验位 * ~ $ = U）；位流与 Base32 op 的 crockford 档同口径 |
| modhex | Modhex（YubiKey） | YubiKey 键盘布局无关十六进制：字母表 cbdefghijklnrtuv ↔ 0-9a-f 逐位替换（UTF-8 字节流），双向；大小写不敏感，解码自动容忍常见分隔符 |
| citrixCtx1 | Citrix CTX1 | Citrix 密码编码（.ica/思杰凭据常见）：UTF-16LE 字节链式异或 0xA5，每个结果的两个半字节各 +0x41 映射为 A-P 字符；双向 |
| dxBase64 | DXBase64 | 风之暇想 DXBase64：raw deflate + 随机 salt 循环 XOR + CRC16 校验的 Base64 变体（带校验、每次密文不同、无需密钥，防和谐） |

### 文本 / 传输编码（39 ops）

| opId | 名称 | 说明 |
|---|---|---|
| binhex | BinHex 4.0 编 / 解码 | Mac BinHex 4.0（Yves Lempereur 规范 + Python binhex）：6-bit 码表 + RLE90 压缩 + CRC-16-CCITT。decode 解析文件名/type/creator/数据叉/资源叉并校验三处 CRC；encode 把 UTF-8 文本封成合规 BinHex（数据叉，空资源叉）。 |
| bubblebabble | BubbleBabble 编码 | Antti Huima 2000 防误读编码：2 字节 → 6 字符，x 包裹 + - 分隔（如 ping → xisak-nerek-loxix）。CTF 指纹/校验和可读展示用 |
| gbCharset | GBK / GB2312 / GB18030 | 中文字符集 ↔ UTF-8（TextDecoder 解码 + 运行时反向建表编码） |
| gb2312QuWei | GB2312 区位码 | 汉字 ↔ 4 位区位码（区01-94 位01-94，字节=区位+0xA0；ASCII 透传） |
| big5 | Big5 繁体中文 | Big5 ↔ UTF-8（TextDecoder + 反向建表） |
| shiftJis | Shift-JIS 日文 | Shift-JIS ↔ UTF-8（TextDecoder + 反向建表） |
| eucKr | EUC-KR 韩文 | EUC-KR ↔ UTF-8（TextDecoder + 反向建表） |
| latinCharset | Latin / ISO-8859 / Windows 单字节 | ISO-8859 全系 + Windows 码页 ↔ UTF-8（单字节直映） |
| ebcdic | EBCDIC | IBM EBCDIC ↔ ASCII（内嵌 037/1047 码表，TextDecoder 不支持） |
| utf16 | UTF-16 BE/LE | UTF-16 编解码 + BOM 处理（encode 可加 BOM，decode 自动识别 BOM） |
| mojibakeFix | 乱码修复 (Mojibake) | 常见字符集错配还原（decode=修复，encode=制造乱码样例）；部分方向有损 |
| hexdump | Hexdump 互转（xxd） | xxd 风格十六进制转储 ↔ 原文本：编码方向输出「偏移: 两字节一组 hex + ASCII」三栏（与 xxd 逐字节一致，行宽/大小写可调）；解码方向容忍 xxd / hexdump -C / CyberChef 等常见格式（含 * 重复行） |
| fullwidth | 全角密码 | ASCII 半角 ↔ 全角（含空格），偏移 0xFEE0 |
| jsEscape | JS escape 编码 | 旧版 JavaScript escape()/unescape() 编码：ASCII 字母数字与 @*_+-./ 不编码，其他 ASCII → %XX，非 ASCII → %uXXXX（UTF-16 code unit）。与 encodeURI/encodeURIComponent 语义不同，CTF 偶考老式 escape 题 |
| jsfuck | JSFuck | 六字符 []()!+ 构造的 JS（仅解码，Function 沙箱） |
| mimeMultipart | MIME multipart 解析 | 解析 multipart/mixed 邮件/HTTP 体：boundary 分 part，识别 Content-Type/Transfer-Encoding（base64/QP/7bit）并解码正文；encode 方向按 \| 分隔组合 |
| urlQueryParse | URL Query 解析 | 解析 URL 查询串（? 后的 k=v&k=v），percent-decode + '+' 转空格，逐行列出键值。支持传入完整 URL。 |
| cookieParse | Cookie 解析 | 解析 Cookie 请求头（多 name=value）或 Set-Cookie 响应头（键值 + 属性）。自动去 Cookie:/Set-Cookie: 前缀。 |
| httpBasicAuth | HTTP Basic 认证 | HTTP Basic 认证：encode 把 user:pass 编码为 'Basic <base64>'；decode 把 'Basic xxx' 或裸 base64 还原为 user:pass。 |
| dataUriParse | Data URI 解析 | data URI 双向：encode 把文本按所选 MIME + 编码方式构造成 data: URI；decode 解析 data: URI 输出 MIME + 内容。 |
| magnetParse | Magnet 链接解析 | 解析 magnet:? 链接：xt 精确主题（提取 BTIH 哈希）、dn 显示名、tr Tracker 列表、xl 文件大小等。 |
| ppencode | ppencode | Perl 关键字编码（PPEncode）：字节 → perl 关键字伪程序（256 关键字字典 + 随机候选），运行即输出原文 |
| url | URL 编码 | RFC 3986 百分号编码（standard/full/plus 三模式） |
| htmlEntity | HTML 实体 | 命名实体（&amp; 等）+ 数字型（&#NN; / &#xHH;） |
| unicodeEscape | Unicode 转义 | \uXXXX / U+XXXX / &#xHH; 三种格式 |
| quotedPrintable | Quoted-Printable | RFC 2045（=XX 转义，软换行折叠） |
| uuencode | UUencode | Unix-to-Unix（行首字节数+32，6-bit 映射 32-95） |
| xxencode | XXencode | XX 编码（码表 +-0-9A-Za-z，结构同 UU） |
| utf7 | UTF-7 编码 | RFC 2152（+...- 修改 base64，UTF-16BE） |
| punycode | Punycode (IDN) | RFC 3492 国际化域名（xn-- 前缀，按 . 分段） |
| jsHex | JS Hex 转义 | \xXX 字节转义（与 \uXXXX 不同，按字节非字符） |
| mixHexOctBin | 混排进制解码 | 0x/0b/0o/0d 前缀混排数字串解码为字符 |
| hexReverse | Hex 字节内反转 | 每两位 hex 组内互换（1a2b → a1b2，自反） |
| leetSpeak | Leet Speak (1337) | 经典 1337 字母替换（A→4, E→3, O→0 等） |
| netbios | NetBIOS 编码 | 半字节 + A 偏移（每字节拆 4 位 + 'A'） |
| caretMdecode | Caret/M 控制字符 | ^X = Ctrl+X（& 0x1F），M-X = Meta-X（\| 0x80） |
| natoAlphabet | NATO 音标字母 | 北约音标字母表（A→Alpha, B→Bravo, ...） |
| asciiControl | ASCII 控制字符 | 控制字符名称 ↔ ASCII 值 + Unicode 符号 |
| yenc | yEnc 编 / 解码 | yEnc（Usenet 二进制传输编码，yEnc-1.3 规范）：每字节 +42 mod 256，关键字节 NUL/CR/LF/'=' 用 '=' 转义 +64。行首 TAB/空格/'.' 保守转义。encode 取 UTF-8 字节，decode 自动跳过 =ybegin/=yend 控制行。 |

### 花式 / CTF 编码（77 ops）

| opId | 名称 | 说明 |
|---|---|---|
| albam | Albam 码 | 希伯来 Albam 置换的拉丁版：26 字母平分两半对位互换（A↔N..M↔Z），对合，数值等价 ROT13 |
| astroSymbols | 天文 / 黄道符号 | 天体与星座英文名 ↔ Unicode 标准符号：planets 档 太阳☉月球☽水星☿金星♀地球♁火星♂…谷神⚳(U+2609/263D/263F/2640/2641/2642…26B3–B6)；zodiac 档 十二宫 ♈–♓(U+2648–2653)；异档符号与未知名称显式报错，非字母字符透传 |
| carbonaro | Carbonaro 码 | 那不勒斯烧炭党单表替换，意大利语 21 字母对位互换（对合表，J K W X Y 透传） |
| morse | 摩斯电码 | ITU-R M.1677（字母/数字/标点，/ 分词） |
| bacon | 培根密码 | 5 位 a/b（24/26 字母两版） |
| rot13 | ROT13 | 字母移位 13（自反） |
| rot5 | ROT5 | 数字移位 5（自反） |
| rot18 | ROT18 | ROT13 + ROT5（自反） |
| rot47 | ROT47 | ASCII 33-126 移位 47（自反） |
| atbash | Atbash | 字母反转（A↔Z，自反） |
| a1z26 | A1Z26 | 字母 ↔ 数字（1-26） |
| dna | DNA 编码 | 3 字母密码子（A/C/G/T）↔ 字符 |
| keyboard | 键盘坐标 | 键盘行列坐标：qwerty3=3 字母行二位连写（Q=11）；full4=4 行含数字行 R.C 点分隔（Q=2.1，0=1.10） |
| kenny | Kenny 语 | South Park Kenny 语：M=0/P=1/F=2 三进制，A=MMM … Z=FFP 每字母三音节；FFF 可作空格（扩展档） |
| clockCipher | 表盘码 / 时钟码 | 12 小时制表盘 + 5 分钟刻度时钟码。字母 A-Z / 数字 0-9 / 常用标点 → "H:MM"（如 A=1:00, B=1:05, M=2:00）。空格分隔。通用可逆方案（非对齐对标工具具体变体）。 |
| twinHex | Twin-Hex 双字符编码 | 双字符查表编码（ASCII 32-127 的 96×96 组合表，索引转 base36 定长 3 位）。仅支持 ASCII 可见字符。 |
| trollScript | TrollScript | BrainFuck 三字符 token 方言（tro 开头 ll. 结尾，ooo/ool/olo/oll/loo/lol/llo/lll 八指令）。encode 生成 / decode 执行，步数上限 500 万。 |
| asciiSum | ASCII 前缀累加和 | 逐字符累加 ASCII 码得递增数列（首项 0，空格分隔）。解码取相邻差值还原。 |
| emojiAes | emoji-aes 加密 | emoji-aes 完整版：AES-256-CBC(OpenSSL) 加密后 base64 → 65 emoji 表替换（对标 Aaron Horler emoji-aes） |
| alienAlphabet | 外星字母 | unicode 档：26 拉丁字母 ↔ 26 个 Unicode 符号（⏃⏚☊⎅…，dCode Alien Language 表）；futurama2 档：Futurama AL2 自修改 Cᵢ=(Pᵢ+Cᵢ₋₁) mod 26（字母级，剧中字形无 Unicode） |
| futhark | 卢恩符文 Futhark | elder 24 符 / younger 16 符（fuþąrkhniastbmlʀ）；TH 双字母组（elder 另有 NG）；解码容错 ᛋᛝ 与短枝变体；多字母合流（C/K/Q→ᚲ 等）致往返有损 |
| chuckUnary | Chuck Norris 一元码 | 字符→7/8 位 ASCII 连成位流做游程：连 N 个 1→「0」+N 个 0，连 N 个 0→「00」+N 个 0，组间空格（Codingame 同款） |
| wingdings | Wingdings 符号字体 | 明文 ↔ Wingdings 符号：unicode 档用真实码位（☺✈☠★…，Alan Wood/Adobe 表）；pua 档用 U+F020-F0FF（本机 wingding.ttf cmap 实测，Word 同款）；四字体 wingdings1/2/3/zapf |
| ook | Ook! | BrainFuck 方言（Ook. Ook? Ook! 三 token） |
| cetacean | 鲸语 Cetacean | 16 位二进制（1->e, 0->E） |
| yygq | 兽音译者 | 就这¿ / 不会吧？ 比特流编码 |
| braille | 盲文 Braille | U+2800 块 ↔ ASCII（auto 自动判码表 / nabcc 标准 6 点 / raw 乱序字典） |
| eightdiagram | 六十四卦 | base64 → 64 卦象映射 |
| pigpen | 猪圈密码 Pigpen | 3 区栅格 26 字母（token 文字描述版 1A-3H） |
| keyboardShift | 键盘漂移 | QWERTY 三行循环移位（参数：位移量 + 方向） |
| aaencode | 颜文字 aaencode | aaencode 颜文字 JS 风格编码（ASCII 八进制 / 非 ASCII 十六进制） |
| baudot | 博多码 Baudot | ITA2/ITA1 博多码 5 位二进制（letters/figures 双表，模式切换） |
| type7 | Cisco Type7 | Cisco 密码 Type7（MAGIC_VALUES 53 项异或，seed 前缀 2 位） |
| decabit | Decabit 脉冲码 | Decabit 10 符号 +− 脉冲编码（0-126 字符表） |
| fracmorse | 分数摩斯 FracMorse | 明文转摩斯后按三元组分块，映射到 26 字母密钥表（pycipher FracMorse） |
| hieroglyphs | 圣书体字母 MdC | 拉丁字母 ↔ 埃及圣书体单字母符（Manuel de Codage，dCode 口径）：20 字母可编（A B D F G H I K L M N P Q R S T W X Y Z），C/E/J/O/U/V 无字形报错；解码收 30 字形（含 𓏭𓂝𓏲𓐝𓋔𓎛𓄡𓈙𓍿𓆓 变体）统一输出大写；SPHINX→𓋴𓊪𓉔𓇋𓈖𓐍 |
| jjencode | JJEncode | JavaScript 符号混淆编码（Yosuke Hasegawa），源码 → 仅 []()!+$_ 符号 |
| keyCode | JS keyCode 表 | JS event.keyCode 8-222 → 键名（支持空格/逗号/分号分隔多个） |
| shiftKey | 上档键符号 | Shift+数字/符号 ↔ 符号/数字（自反双向） |
| keyword9 | T9 九宫格 | 手机 T9 键盘四模式：二位数字 / 重复数字 / 数字+\\|/ / 字母+长度 |
| keyboardSurround | 键盘包围键 | 相邻键集合→中心键 或 数字坐标→字符（nliqwerty） |
| qweAbc | QWERTY→ABC | QWERTY/QWERTZ/AZERTY 键盘 → ABC 标准字母表 |
| layoutMap | 键盘布局映射 | QWERTY ↔ Dvorak ↔ Colemak 物理键位置换（47 键双射，大小写保留） |
| t9Phone | 手机九宫格 T9 | 手机 T9 键盘编码：twoDigit=二位固定（键号+按次，a=21 … z=94，空格=00）；multitap=多击（2=a 22=b 222=c，空格分词，0=空格） |
| stenoLetter | Steno 速记字母 | 速记机字母和弦（Plover 字母理论，A-Z ↔ 单 stroke，空格分词） |
| arrowKey | 方向键编码 | ↑↓←→ ↔ WASD / UDLR / 数字小键盘（参数选方案，同方案往返无损） |
| lolcode | LOLCODE | LOLCODE 语言字符移位编码（-3 后 >69 +5 否则 +2，非双射 H/I/J 不可逆） |
| marineFlags | 国际信号旗文本码 | 国际海上信号旗（ICS）：一面旗一个 A-Z 字母/0-9 数字，文本 token=字符本身（旗图无 Unicode，按 dCode 内部槽名）；代旗档 substitute：组内重复的第 1..4 面旗以 k/l/m/n 代旗表示（SOS→SOk），解码反向还原并校验代旗引用；关闭档遇 k/l/m/n 报错 |
| mirrorLetters | 镜像字母 | 拉丁字母 ↔ 水平镜像 Unicode 字形（A↔A、b↔d、a→ɒ、E→Ǝ…；()[]{}<>/\ 五对为 Unicode 官方 Bidi_Mirrored 对；数字不映射），双向严格互逆 |
| americanMorse | 美式摩斯码 | American Morse Code（19 世纪大陆电报，含内部间隔/长划 _，字母间 / 分隔） |
| cnTelegraphMorse | 中文电码摩斯 | 4 位中文电码数字 ↔ 摩斯（每 4 位一组，中文需先查《标准电码本》） |
| tapCode | 敲击码 Tap Code | 5×5 Polybius 方阵敲击码（行列数字对，空格分隔；可选 I/J 合并或 K→C 合并） |
| semaphore | 旗语 Semaphore | 字母 ↔ 双旗方向对（8 方向，基于 Wikipedia Flag semaphore） |
| dtmf | DTMF 双音多频 | DTMF 按键 → 行列频率对（ITU-T Q.23，697-941 × 1209-1633 Hz） |
| morseRhythm | 摩斯节奏规范化 | 摩斯点划符号规范化（· − ↔ . -，支持多种点划变体） |
| musicNotation | 音乐记号互转 | 音名(C4)/MIDI(60)/简谱(1)/唱名(do) 四向互转。支持 15 个大调调号，A4=440Hz。encode=from→to，decode=to→from |
| musicInfo | 音符全息信息 | 输入音名/MIDI/简谱/唱名，输出全部四种格式 + 频率 + 八度 + 半音偏移 |
| occult | 神秘学字母四件 | theban 档：巫师字母 24 符（J→I、V/W→U 合并，词尾 . 保留，文本 token=字母，图形层见 dCode）；lunaire 档：Katz 月相字母（Ñ→N，27 槽）；celestial/malachim 档：Agrippa 天使/玛拉基字母——拉丁↔希伯来转写（ג=C/G ו=F/U/V/W י=I/J/Y 收敛，X 无对应报错，ט/ס/צ 报错）；CELESTIAL→גהלהשתיאל |
| qqxiuzi_arrow | 千千秀字·箭头 | 千千秀字箭头密码（原称「QQ秀箭头」；符号表出自千千秀字网站，与腾讯 QQ 秀无关。hex 双字符 + 箭头映射） |
| qqxiuzi_flower | 千千秀字·花 | 千千秀字花密码（原称「QQ秀花」；hex 双字符 + 花符映射） |
| qqxiuzi_ipa | 千千秀字·IPA | 千千秀字 IPA 密码（原称「QQ秀 IPA」；hex 双字符 + IPA 辅音映射） |
| qqxiuzi_letter | 千千秀字·字母 | 千千秀字字母密码（原称「QQ秀字母」；hex 双字符 + 打乱字母映射） |
| qqxiuzi_braille | 千千秀字·盲文 | 千千秀字盲文密码（原称「QQ秀盲文」；1 字符/字节 + \|128 宽字符处理） |
| qqxiuzi_chinese | 千千秀字·汉字 | 千千秀字汉字密码（原称「QQ秀汉字」；三表 SB/MB/MT + 三后缀 =/==/===） |
| qqxiuzi_music | 千千秀字·音乐 | 千千秀字音乐密码（原称「QQ秀音乐」；十进制 3 字符 + 10 项符号表 + 三种前缀后缀） |
| roar | 兽音译者（嗷呜啊~） | 兽音译者 roar 4 字符 codec 变体：Unicode 码点 → 4 位 hex → 按位偏移 → codec 2 字符映射 + 前后缀包裹。codec 可自定义（4 个不重复字符）。与 yygq（就这¿/不会吧？）是不同算法 |
| rot8000 | ROT8000 | Unicode 版 ROT13：BMP 有效码位表旋转半程（自反）；offset 参数可切 31753 全字符平移兼容版（仅空格除外），auto 自动检测 |
| sga | 银河标准字母 SGA | 26 拉丁字母 ↔ Standard Galactic Alphabet（Commander Keen/Minecraft 附魔台文字）文本域用 dCode 收录的民间 Unicode 适配串（ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ̣⚍⍊∴̇/\|\|，dCode 自评「糟糕但流传广」）；数字不译原样保留，u/x 含组合点（裸 ℸ/∴ 容忍） |
| manchester | 曼彻斯特编码 | Manchester Encoding：每比特中央跳变，0/01 ↔ 1/10（IEEE 802.3 / G.E. Thomas 双约定）。输入文本或比特流。 |
| diffManchester | 差分曼彻斯特编码 | Differential Manchester：中央必跳变（时钟），0=周期起始跳变，1=不跳变（IEEE 802.5 Token Ring 约定）。 |
| nrzi | NRZI 编码 | Non-Return-to-Zero Inverted：USB 约定 0=跳变/1=不跳变，经典约定 1=跳变/0=不跳变。USB 2.0 / Fast Ethernet 用。 |
| miller | 密勒码 | Miller Code / Delay Modulation：1=中央跳变，0 跟 0 后=起始跳变，0 跟 1 后=不跳变。磁盘存储用。 |
| fourB5B | 4B5B 编码 | 4-bit → 5-bit code（FDDI/100BASE-TX）。表照 ANSI X3T9.5 规范，每 4 位映射为 5 位以保证足够跳变。 |
| pwmPpm | PWM/PPM 脉冲调制 | PWM（脉宽）0=10, 1=110；PPM（脉位）0=100, 1=010。CTF 硬件流可视化常见。 |
| spoon | Spoon | Brainfuck 的前缀码二进制变体（8 指令映射为霍夫曼式 0/1 串，双向严格往返） |
| txtmoji | txtmoji emoji 加密 | txtmoji.com emoji 加密（AES-256-CBC OpenSSL + 65 emoji 表替换 + 切固定前缀）。密码为十进制/任意口令。CTF 常见「标题即密码」的表情符号密文 |
| wabun | Wabun 和文摩尔斯 | 日语假名 ↔ 摩尔斯（和文モールス符号标准表，含浊点 ゛半浊点 ゜长音 ー；假名点划间空格、词间 / 分隔） |

### 深奥编程语言（15 ops）

| opId | 名称 | 说明 |
|---|---|---|
| blub | Blub! | BrainFuck 的 Ook 同族方言（Blub. Blub? Blub! 三 token，两两组合映射 8 指令）。encode 生成 / decode 执行。 |
| cow | COW / MOO | COW 深奥语言（Sean Heber，12 指令 moo/mOo/moO/mOO/Moo/MOo/MoO/MOO/OOO/MMM/oom/OOM，含循环+寄存器+自解释 mOO，步数上限 500 万）。encode 生成 / decode 执行。 |
| brainlollerDecode | Brainloller 解码 | Brainloller 图像 → Brainfuck 程序（bftools 实测色表 + 蛇形路径；终止色 firebrick，转向标记占格） |
| brainlollerEncode | Brainloller 编码 | Brainfuck 程序 → Brainloller PNG（蛇形布局，行容量 W-2，行容量随宽度可调） |
| braincopterDecode | Braincopter 解码 | Braincopter 图像 → Brainfuck 程序（f=(-2R+3G+B) mod 11 经典规范；遇 nop/终止即停） |
| braincopterEncode | Braincopter 编码 | Brainfuck 程序 → Braincopter PNG（每像素 f=(-2R+3G+B) mod 11，最小改动写入，终止符填充到宽度整数倍；载体为指定纯色） |
| deadfish | Deadfish | 累加器语言（i/d/s/o 四指令，加减平方输出，步数上限保护） |
| befunge | Befunge-93 执行 | 2D 栈式深奥语言执行器（> < ^ v 方向，@ 结束，网格环绕，步数上限 100 万） |
| emojicodeIdent | Emojicode 识别 | emoji 关键字语言识别（🏁🍇🍉🔤🍮 等特征，仅识别标注） |
| pietIdent | Piet 识别 | 图像色块深奥语言识别（需图像本体，仅识别标注说明） |
| brainfuck | BrainFuck | 8 指令 BF（执行/生成，步数上限 500 万；默认兼容括号反向的字符交换题） |
| whitespace | Whitespace | space/tab/newline 栈机语言（栈/算术/堆/流控/IO，100 万步上限，整数绝对值不超过 2^53-1） |
| malbolge | Malbolge 识别 | 深奥语言装载形式检查（忽略空白，按位置校验指令；仅识别不执行） |
| malbolgeExec | Malbolge 执行 | Malbolge 解释器（Ben Olmstead 1998 三进制虚机）：执行程序输出结果，附 normalize/assemble 规范形转换；步数上限护栏防死循环，EOF 读 59048 |
| pietExec | Piet 执行 | Piet 图形语言解释器（DP/CC 状态机执行→输出）。支持真图像输入（PNG 拖入/粘贴 base64，npiet 补齐路径）与色块网格文本（色码 Rl/Y/Gd/C/B/M + K黑 W白 或 6 位 hex）。执行语义对齐 npiet v1.3，仅执行。 |

### 中文 / 本土编码（20 ops）

| opId | 名称 | 说明 |
|---|---|---|
| stemBranch | 天干地支 | 六十甲子编码（mode 切 base60 大整数 / era 编号映射；era 兼容参考实现错别字字典并自动检测） |
| baiJiaXing | 百家姓 | 汉字 ↔ base64 字符映射（赵钱孙李…） |
| element | 元素周期表 | 元素符号 ↔ 序号 ↔ 字符（H=1…Og=118） |
| foyu | 佛曰 | keyfc 与佛论禅 V1：UTF-16LE + 固定密钥 AES-256-CBC + 咒字映射；不支持如是我闻V2及旧自创方言 |
| countingRods | 算筹数字 | 中国算筹记数：个百十万位用纵式 𝍩-𝍱、十千万位用横式 𝍠-𝍨（一纵十横），0 用〇；空格分隔多个数，双向 |
| shzyhxjzg | 社会主义核心价值观 | UTF-8 hex → duo（10/11 前缀）→ 富强民主…友善 12 对字 |
| makkaPakka | 玛卡巴卡 | 字符 → 玛卡巴卡/阿巴雅卡/咿呀呦…轰 段（玛卡巴卡语言） |
| pawnshop | 当铺密码 | 汉字出头封闭区域数 ↔ 数字（当铺密码经典版） |
| yueChang | 曰唱 | 风之暇想 曰唱：deflate + PBKDF2-SHA256(10万次) + AES-GCM-256，Base64 逐字符映射为中文拟声字（前缀「唱：」，口令可空则用默认 YueChang） |
| fuyouyue | 佛又曰 | 与佛论禅V2（AES-256-CBC + 心经字符映射，完整版） |
| tianshu | 天书 | 天书曰（AES-256-CBC + 道经字符映射，佛又曰变体） |
| huoxingwen | 火星文 | 简体/繁体/火星文三向转换（转火星文模式） |
| jianfan | 简繁转换 | 简体↔繁体转换（charPYStr/ftPYStr 映射表） |
| moyue | 魔曰 | Abracadabra 中文版（文言仿真 / 传统两模式，AES-256-CTR + 压缩 + 字表替换，需密钥） |
| numToPinyin | 数字转拼音 | 数字读拼音。逐位读(1 可选 yāo)或数值读(中文数字读法，支持到兆)。调号可切换 |
| hanziToPinyin | 汉字转拼音 | 汉字转拼音（内置约300高频常用字，多音字取常见读音，表外字原样/标?）。调号可切换 |
| suiYanSuiYu | 随言随语 | 字符 ord 转 4 进制 → 字典映射 + 长度前缀（cn 花式编码） |
| xiangyue | 想曰 XiangYue | 想曰全流程解密：中文/Emoji/零宽/日/韩/象形密文 → Argon2id/PBKDF2 + ChaCha20-Poly1305 + AES-CTR + zlib（默认口令内置；format1 派生较慢约数秒） |
| xiangyueEnc | 想曰 XiangYue 加密 | 想曰加密方向：明文 → zlib + AES-CTR + ChaCha20-Poly1305 → 中文/日文/韩文/象形/Emoji/零宽/Base64 密文，可被本工具箱「想曰」解密自动识别还原（format2 快；format1 Argon2id 64MiB 单次数秒） |
| xiongyue | 熊曰 | zlib压缩+base91+熊语字典（前缀 熊曰：呋） |

### 古典密码（71 ops）

| opId | 名称 | 说明 |
|---|---|---|
| alberti | Alberti 圆盘 | 1467 多表替换圆盘：外盘 A-Z，内盘混合表，可周期转动 |
| amsco | AMSCO 密码 | 不完整列换位：网格每格容量沿反对角线交替（切割序列，默认 1,2），按密钥字母序逐列读出；默认例 DCODEAMSCO+CLE → DEAODSCCOM |
| bazeries | Bazeries 密码 | 5×5 方阵替换 + 数字 key 分组反转（key 转英文单词构造密钥矩阵，I/J 合并，古典密码） |
| beaufortVariant | 变体 Beaufort | 变体 Beaufort（Beaufort 德意志变体）：c = p − k（mod 26），加密=维吉尼亚解密、解密=维吉尼亚加密；非自反（与自反的标准 Beaufort 互为镜像方向） |
| bellaso | Bellaso 密码 | 1553 互反多表代换（dCode 口径）：生成密钥两半补全成互反字母表、N 张后半轮转表、按词取密钥字母选表；加密=解密；默认复现 DCODE BELLASO 例（alphabet=20） |
| chaocipher | Chaocipher | Chaocipher 双转子置换密码（Byrne 1918，2010 年公开）。左=密文盘 / 右=明文盘，每加密一字符后按 zenith/nadir 规则动态置换两盘。默认盘为官方展品字母表，可自定义。仅处理 A-Z。 |
| vigenere | 维吉尼亚 | 字母密钥加减移位 |
| gronsfeld | Gronsfeld | 数字密钥维吉尼亚 |
| beaufort | Beaufort | 自反（编解码同形） |
| autokey | AutoKey 自动密钥 | 密钥流=keyword+明文 |
| porta | Porta | 自反（编解码同形） |
| playfair | Playfair | 5×5 键控方阵 |
| nihilist | Nihilist 虚无党 | 键控 Polybius |
| columnar | 列移位 | 按 key 字母顺序读列 |
| hill | Hill 希尔 | 矩阵加密（默认 mod 26；可自定义字母表，模数=表长，密钥同表解析，密钥须完全平方数） |
| affine | 仿射 | c=(a·x+b) mod 26（a 与 26 互质，b=0 即乘法密码） |
| bifid | Bifid 双分 | 按 period 分组的 Polybius 转置 |
| trifid | Trifid 三分 | 3×3×3 方阵（key 须 27 字符） |
| polybius | Polybius 方阵 | 5×5（J→I），字母↔坐标对 |
| adfgx | ADFGX | Polybius + 列移位（5×5） |
| adfgvx | ADFGVX | Polybius + 列移位（6×6 含数字） |
| foursquare | FourSquare 四方 | 双 25 字母密钥方阵 |
| graycode | 格雷码 GrayCode | 格雷码 g=n^(n>>1) 三模式：text=文本↔比特格雷串；num=十进制数值↔格雷二进制串（带位宽）；bytes=逐字节 g=b^(b>>1)，文本↔Gray Hex。 |
| trithemius | Trithemius 渐进移位 | 第 i 个字母移位 (start+i) mod 26（多表密码早期形式，Tabula Recta 渐进） |
| otp | 一次一密 OTP | 模 26 密钥流加减（字母表，非字节异或）；密钥须 ≥ 明文字母数 |
| keywordcipher | 关键字密码 | 关键字去重打头 + 剩余字母顺补，构造单表替换（caseMode=upper 即原「单表置换密码」编大写/解小写行为） |
| simplesub | 简单替换 | 自定义 26 字母置换表单表替换（A-Z 依次映射到密钥表） |
| runningkey | 滚动密钥 | 长文本作密钥的维吉尼亚（密钥流按明文字母推进） |
| railFence | 栅栏密码 | W 型 zigzag（参数：栏数） |
| caesar | 凯撒密码 | 指定位移量（encode +shift，decode -shift）；mode 可切递增/递减凯撒（第 x 字符位移 shift±x） |
| homophonic | 同音替换 | 一明文字母映射多个密文符号（00-99 数字池或自定义池）抗频率分析；密表由密钥+分配方式派生，轮转/随机两种选择 |
| doubleTrans | 双重列移位 | 列移位连用两次（密钥1 加密后再用密钥2 加密，解密反序）；与「列移位」op 同口径（只保留 A-Z，按 key 字母序读列） |
| pollux | Pollux 密码 | 摩斯衍生：点/划/分隔各映射一组符号（默认 047/158/2369），轮转或随机取用；词分隔双符号（默认，可往返）或单符号 |
| morbit | Morbit 密码 | 摩斯衍生：含分隔符的摩斯流按两位一组（9 种对），9 字符密钥按字母序定秩映射数字 1-9；奇数长补分隔符 |
| bookCipher | 书卷密码 | Beale 式编号指向共享文本：word=全序第 N 词；line-word=第 l 行第 w 词；first/next 两种取位，宽松/严格两种匹配 |
| turningGrille | 转动格栅 | Fleissner 格栅：N×N 格栅 4 次 90° 旋转逐格填入/读出（顺/逆时针）；格栅串 # 孔 . 实 / seed:种子 / 空=规范形；每轨道恰 1 孔 |
| collon | Collon 密码 | 一字母→双字母组（行首+列末）再按 N 字母系列首末换位（dCode 口径）；默认网格去 J、N=2，即 dCode 例 DCODE→AAYXLAYYAZ |
| caesarBox | 凯撒箱换位 Caesar Box | 箱型（列）换位：去空格后按指定列宽逐行写入网格、再逐列读出。解密用转置列宽再走一次。注意仅当长度为列宽整数倍时可完整还原（残格时转置不是逆运算，此为算法固有性质）；空格在编码时被去除，不可还原。 |
| curveCipher | 曲路密码 Curve Cipher | 蛇形（曲路）换位：row×col 网格按列蛇形读取，奇偶列方向相反，末尾整体反转。需 row×col = 文本长度。 |
| dancingMen | 跳舞小人 Dancing Men | 福尔摩斯《跳舞的小人》单表替换：文字 token=字母+词尾旗标*（小人姿态无法文本化，按 dCode 内部标识以字母为本体）；story 档仅原作 18 字母（F/J/K/Q/U/W/X/Z 报错），默认复现 Wikipedia 第五消息 ELSIE PREPARE TO MEET THY GOD 的旗标结构 |
| cardanGrille | 卡丹格 Cardan | 固定格栅掩模取字（不旋转，区别于转动格栅）：X 实格 _ 孔；fill 档孔位藏明文+随机字母补实位（dCode 主形态），hide 档掩护文本补实位（Richelieu 形态）；解密取孔位 |
| enigma | Enigma 恩尼格玛机 | 德军 Enigma I 三转子密码机（转子 I-V + 反射器 B/C + 环设置 + 插线板，自反） |
| yuanYin | 元音密码 | 数字 → 字母（1/2/3/4/5=a/e/i/o/u，辅音两位） |
| columnReplace | 列置换密码 | 按密钥字母序读列（明文补空格至 keylen 整数倍） |
| rowsReplace | 行置换密码 | 每 keylen 一块块内按密钥字母序重排 |
| scytale | Scytale 密码棒 | 栅格转置；密钥可按栏数或每栏字数解释。编码补 \|，解码保留完整格子，不删除真实竖线；原长与补位无法自动区分。dCode 兼容三开关（补位符 _/剥非字母数字/裁尾填充）默认关闭，开启即与 dCode.fr 逐字节同口径（T502 三源对拍 36/36） |
| fenham | Fenham 密码 | A-Z 字母转 7 位 ASCII 二进制，与密钥逐位 XOR（二进制输出） |
| gematria | Gematria 数值 | 字母↔数值：Ordinal/Pythagorean/Simple×6/Reverse/希伯来/希腊，逐字母序列+可选总和 Σ |
| goldbug | GoldBug 金甲虫密码 | 爱伦坡《金甲虫》Kidd 密码符号替换（26 字母各一唯一符号，可逆教学版） |
| jefferson | 杰斐逊轮盘 | Jefferson/Bazeries 转轮密码：圆盘排列顺序为密钥，明文对齐基准行后从偏移行读出；offset 已知故双向可逆（默认即 Wikipedia 10 盘例） |
| kamasutra | Kamasutra 爱经密码 | 配对表替换（自反：A↔B, C↔D...，加密=解密） |
| ls47 | LS47 字母牌密码 | ElsieFour/LC4 的 7×7 扩展（49 字符含小写字母/数字/常用符号）：牌面行列随每字符旋转 + marker 混合位，状态自同步。密钥支持 49 字符排列或口令派生。对照官方参考实现 ls47.py 逐字对拍 |
| m209 | M-209 转轮密码机 | 二战美军 M-209（Hagelin）机械密码机（6 密钥轮 + 27 杆笼 lug + pin 设置，Beaufort 自反） |
| monomeBinome | Monome-Binome 单子双子 | Polybius 族坐标替换：3 行不完整网格 + 两个行键数字，首行字母出 1 位数（monome）、后两行出 2 位数（binome）；3x10 档 28 码位（A-Z+空格+*），3x8 档 24 字母（J→I、U→V）；默认复现 dCode 例 MONOME→34363536345 / 4303536345→DINOME |
| nihilistCipher | Nihilist 密码 | Polybius 方阵 + 关键词加数古典密码（5×5 方阵 I/J 合并，明文/密钥编码为两位数后逐位置整数相加，俄国民意党 1880s） |
| phillips | Phillips 密码 | 5x5 方阵周期代换：第 1 行逐次下移生成 8 阵、每块 5 字母换一阵，明文取「右下方一格」（ACA 口径）；默认即 ACA 64 字母算例方阵 |
| pizzini | Pizzini 密码 | A-Z → 数字替换（A=4..F=9, G=10..Z=29，无分隔数字串） |
| ragbaby | Ragbaby 密码 | 多表代换：关键词字母表 + 位移随「词内位置」递增（shift=词序号+词内位置-1）；26 字母无损档 / 24 字母原始档（去 J、X）；默认复现 CIPHER 例 |
| redefence | Redefence 栅栏 | Redefence：栅栏（W 型 zig-zag）的行序变体——按指定行序或关键词读出行。行序为恒等序时退化为标准栅栏。参数：栏数 rails / 读行序 order / 关键词 key（order 与 key 二选一） |
| rotSpecial | Rot 任意位移 | 任意位移量 N 的循环移位（letters/alnum/ascii94），decode 反向 |
| routeCipher | 曲路密码 | 明文填入 W 列矩阵，按蛇形/垂直路由读出（置换密码） |
| skipCipher | Skip 跳读密码 | 固定步长跳读换位：从 start 起每 s 个字符取一个、到头回绕循环；要求 gcd(s,长度)=1；默认例 DCODE+3 → DDCEO |
| slidefair | Slidefair 密码 | 双字母矩形代换：P1 在顶行、P2 在密钥行成对角，密文取另两角（顶行角在前）；同列退化取右侧一对；Vigenère/Variant/Beaufort 三档表；默认即 ACA DIGRAPH 例 |
| solitaire | Solitaire 扑克流密码 | Schneier 的手工流密码（又名 Pontifex），54 张牌演化生成密钥流，可用 keyword 排牌 |
| foursquarekw | Four-square 四方（keyword） | 四方密码：两个 keyword 生成密文方阵 + 两个标准明文方阵，双字母替换。5×5，奇数补 X。字母表可选 I/J 合并或省略 Q（后者复现 Wikipedia 官方向量）。与既有 foursquare（原始方阵版）算法一致、入口为关键词。 |
| twosquare | Two-square 双方 | 双方密码（double Playfair）：两个 keyword 方阵，横排或纵排双字母替换。自反密码（编=解）。5×5，奇数补 X；纵排同列 / 横排同行时该组原样输出。字母表可选 I/J 合并或省略 Q。 |
| straddleCheckerboard | 跨界棋盘 | Straddling checkerboard 跨界棋盘：变长编码棋盘。8 个高频字母占单数字、两空列前缀引出双数字行，自定界无需分隔符即可解码。默认照 Wikipedia 经典配置（ATONESIR + 前缀 2/6）。棋盘外字符编码时跳过。 |
| threeSquare | 三方密码 Three-square | 三方密码：双字母组→三字母组（方阵1同列字母+方阵3交点+方阵2同行字母）；随机位参数化为轮转/取首，解密只看列号行号故严格可逆；默认即 dCode 官方例（ONE/TWO/THREE，去 Z），UDBJDC→CODE |
| trilitere | Trilitère 三元密码 | 每字母 → abc 三元组（三进制，培根密码的三元姊妹）：默认 A=AAA…Z=CCB、空格=CCC；可换 1/2/3 或 0/1/2 符号 |
| vic | VIC 密码 | 冷战铅笔密码：短语+日期+个人号+密钥组 链式相加派生密钥流 → 跨行棋盘化 → 列换位+三角扰乱双换位；默认即 Wikipedia 例（派生线 A-S 可复现） |
| zodiac | 黄道十二宫 Z408 | Zodiac 杀手 Z408 同音替换（Harden 1969 破译子集，54 符号→字母，token 用 zodiackillerciphers 机器命名）：编码可同音轮转，J/Q/Z 无符号报错；默认解出密文首行 ILIKE…（Wikipedia/dCode 口径） |

### 现代密码·分组（32 ops）

| opId | 名称 | 说明 |
|---|---|---|
| aria | ARIA（RFC 5794） | 韩国标准 ARIA 分组密码：128 位分组，密钥 128/192/256 位（12/14/16 轮）。SL1/SL2 交替替换层 + 对合扩散层 A，RFC 5794 密钥调度。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。过 RFC 5794 附录 A 三组向量。 |
| noekeon | Noekeon | Noekeon 分组密码（NESSIE 提名，128 位分组/128 位密钥，16 轮 SPN direct 轮序）。ECB/CBC，hex 输入输出，不填充。过 botan noekeon.vec 与 NESSIE 向量（1029 组单块 KAT 逐字）。 |
| shacal2 | SHACAL-2 | SHACAL-2 分组密码（NESSIE 入选，256 位分组，密钥至多 512 位，基于 SHA-256 压缩函数）。ECB/CBC，hex 输入输出，不填充。过 botan shacal2.vec（1019 组单块 KAT 逐字）。 |
| cast6 | CAST-256 | CAST-256/CAST6 分组密码（RFC 2612，128 位分组，128/192/256 位密钥，6 前向 + 6 反向 quad-round）。ECB/CBC，hex 输入输出，不填充。过 RFC 2612 附录 A 三组终态 KAT。 |
| camellia | Camellia（RFC 3713） | NTT/三菱 Camellia 分组密码：128 位分组，128/192/256 位密钥（18/24 轮 Feistel），FL/FLINV 每 6 轮插入。NESSIE/CRYPTREC 推荐。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。过 RFC 3713 附录 C 三向量。 |
| aes | AES | 高级加密标准（ECB/CBC/CFB/OFB/CTR 纯 JS + GCM WebCrypto，key 16/24/32 字节） |
| des | DES | 数据加密标准（FIPS-46-3，key 8 字节，块 8 字节） |
| des3 | 3DES / TripleDES | 三重 DES（EDE，key 16 或 24 字节，块 8 字节） |
| tea | TEA | Tiny Encryption Algorithm（64位块，128位密钥，32轮 Feistel，Wheeler 1994；支持 ECB/CBC/CFB/OFB/CTR） |
| xtea | XTEA | 扩展 TEA（改进密钥调度，64位块，128位密钥，32轮，Needham 1997；支持 ECB/CBC/CFB/OFB/CTR） |
| xxtea | XXTEA | 可变长度块 TEA（整个数据一次性加密，≥8字节，128位密钥，Wheeler 1998） |
| sm4 | SM4 | 国密分组密码（GB/T 32907-2016，前身 GM/T 0002-2012；128位块，128位密钥，32轮非线性迭代。模式：ECB/CBC/CFB/OFB/CTR + GCM 认证加密） |
| aesCmac | AES-CMAC | AES-CMAC 消息认证码（RFC 4493，AES-128） |
| sm4Cmac | SM4-CMAC | SM4-CMAC 消息认证码（SM4 块 + ISO/IEC 9797-1 结构） |
| seed | SEED（RFC 4269） | 韩国 KISA 标准 SEED 分组密码：128 位分组 / 128 位密钥 / 16 轮 Feistel，两个 8x8 S 盒 + 掩码线性混合（等价 4 个扩展 SS 盒）。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。过 RFC 4269 附录 B 两组向量。 |
| rc5 | RC5 | RC5-32/12/16 分组密码（RFC 2040，64位块，12轮，可变密钥；支持 ECB/CBC/CFB/OFB/CTR） |
| idea | IDEA | 国际数据加密算法（Lai 1991，64位块，128位密钥，8.5轮，mod 2^16+1 乘法 + mod 2^16 加法 + XOR） |
| blowfish | Blowfish | Blowfish 分组密码（Schneier 1993，64位块，可变密钥4-56字节，16轮Feistel；支持 ECB/CBC/CFB/OFB/CTR） |
| rc6 | RC6 | RC6 分组密码（RFC 2276，128位块，可变密钥1-255字节，20轮；支持 ECB/CBC/CFB/OFB/CTR） |
| cast5 | CAST-128 | CAST-128/CAST5 分组密码（RFC 2144，64位块，可变密钥5-16字节，12/16轮；支持 ECB/CBC/CFB/OFB/CTR） |
| twofish | Twofish | Twofish 分组密码（Schneier 1998 AES 提案，128位块，16轮，密钥128/192/256位；支持 ECB/CBC/CFB/OFB/CTR） |
| rc2 | RC2 | RC2 对称加解密（RFC 2268，ECB/CBC，纯 JS，key 1..128 字节） |
| des2Mitm | 2DES 中间相遇 | 2DES 中间相遇攻击（MITM）：C=DES_k2(DES_k1(P))，forward 表 + 反向查表恢复双密钥（keyBits 控制每半密钥空间，默认 16 位；参数框填明文hex/密文hex，各 8 字节；主输入框不再使用） |
| aesKeyWrap | AES Key Wrap | AES 密钥包装（RFC 3394，AIV=A6×8，明文须 8 字节倍数）/ 带填充包装（RFC 5649，AIV=A65959A6+长度，任意长度 1..2^32 字节）。KEK 支持 AES-128/192/256；解包完整性校验失败明示报错。RFC 3394 §4.1-4.6 五组 + RFC 5649 §6 两组官方向量验证。 |
| kuznyechik | Kuznyechik（GOST R 34.12-2015） | 俄罗斯联邦标准 Kuznyechik（Grasshopper）分组密码：128 位分组 / 256 位密钥 / 10 轮 LSX-SPN，密钥排程 Feistel（C=L(Vec_128(i))）。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。过 GOST R 34.12-2015 §A.1（RFC 7801 §5 同源）向量。 |
| magma | Magma（GOST R 34.12-2015） | 俄罗斯联邦标准 Magma 分组密码（原 GOST 28147-89 现代化定义）：64 位分组 / 256 位密钥 / 32 轮 Feistel，S 盒 id-tc26-gost-28147-param-Z。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。过官方 §A.2 向量。 |
| mars | MARS 分组密码 | MARS 分组密码（IBM 1998，AES 决赛圈）：128 位分组，128/192/256 位密钥，32 轮（前向混合+加密核心+后向混合）。明文/密文/密钥均 hex，ECB 多块。encode 加密 / decode 解密。已过 Crypto++ marsval.dat 官方向量。 |
| present | PRESENT 轻量分组密码 | PRESENT 轻量级分组密码（Bogdanov 2007 / ISO/IEC 29192-2）：64 位分组，80/128 位密钥，31 轮 SPN（4-bit S 盒 + 比特置换）。明文/密文/密钥均 hex，ECB 多块。encode 加密 / decode 解密。已过官方全零测试向量。 |
| serpent | Serpent | Serpent 分组密码（Anderson/Biham/Knudsen）：AES 竞赛亚军，128 位分组，128/192/256 位密钥，32 轮 SPN，8 个 bit-sliced S 盒。ECB 多块，明文/密文/密钥均 hex。encode 加密 / decode 解密。与参考实现逐向量对拍。 |
| simonSpeck | Simon / Speck 轻量密码 | NSA Simon（AND-rotate）与 Speck（ARX）轻量级分组密码，ECB 单/多块。明文密文密钥均 hex。encode 加密 / decode 解密。已过论文附录 C 官方测试向量。 |
| threefish | Threefish 可调分组密码 | Threefish 可调分组密码（Skein v1.3 内建）：256/512/1024 位分组，密钥同长，72/80 轮无密钥调度器 + 128 位 tweak。明文/密文/密钥/tweak 均 hex，ECB 多块。encode 加密 / decode 解密。已过 Crypto++ threefish.txt 官方向量。 |
| skipjack | Skipjack 分组密码 | Skipjack 分组密码（NSA 1998 解密，Clipper 芯片核心）：64 位分组，80 位密钥，32 轮（8A+8B+8A+8B）。明文/密文/密钥均 hex，ECB 多块。encode 加密 / decode 解密。已过 NIST SP800-17 Table 6 官方向量。 |

### 现代密码·流（21 ops）

| opId | 名称 | 说明 |
|---|---|---|
| a51 | A5/1 流密码 | GSM A5/1 语音加密流密码（Briceno/Goldberg/Wagner 参考实现）：三个 LFSR（19/22/23 位）多数表决钟控。64 位会话密钥 Kc + 22 位帧号。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。 |
| a52 | A5/2 流密码 | GSM A5/2 语音加密流密码（Briceno/Goldberg/Wagner 参考实现）：四个 LFSR（19/22/23/17 位）R4 择多钟控 + 掩码位非线性输出，输出延迟一拍。64 位会话密钥 Kc + 22 位帧号。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。 |
| rc4 | RC4 | RC4 流密码（自反，key 任意长） |
| xor | XOR | 重复密钥异或（自反，CTF 最常用；单字节爆破见分析类 xorBrute） |
| salsa20 | Salsa20 | Salsa20/20 流密码（Bernstein，key 16/32 字节，nonce 8 字节，64位块计数器） |
| chacha20 | ChaCha20 | ChaCha20 流密码（RFC 8439，key 32 字节，nonce 12 字节，32位块计数器） |
| rabbit | Rabbit 流密码 | RFC 4503 Rabbit 流密码（128-bit key + 64-bit IV）。encode: 文本→Hex 密文；decode: Hex→文本。对称可逆。RFC4503 §3 测试向量（全 0 key/IV）已验证。 |
| e0 | E0 流密码 | 蓝牙 E0 流密码（Bluetooth Core Spec 卷 2 §3）：4 个 LFSR（25/31/33/39 位）+ 求和组合器 T1/T2 + 2 位 blend 记忆。128 位 Kc + 48 位 BD_ADDR + 26 位 CLK。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。已与 Python 参考实现交叉验证 5 组向量。 |
| flashSwirl | FlashSwirl 闪旋 | 作者「风之暇想」的 ARX 对称流密码（256-bit key + 192-bit nonce，8/20 轮）。encode: 文本→Hex 密文；decode: Hex→文本。对称可逆，官方 stream 测试向量已验证。 |
| hc128 | HC-128 流密码 | HC-128 流密码（Wu Hongjun FSE 2004，eSTREAM 决赛）：P/Q 各 512×32bit 表 + f1/f2（SHA-256 σ）+ h1/h2 非线性映射。128 位 key + 128 位 IV。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。已过 Crypto++ 官方向量（key=IV=0 + key=80..0）。 |
| hc256 | HC-256 流密码 | HC-256 流密码（Wu Hongjun FSE 2004，eSTREAM 决赛）：P/Q 各 1024×32bit 表 + f1/f2（SHA-256 σ）+ G1/G2（含表查找）+ h1/h2（4 字节索引）。256 位 key + 256 位 IV。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。已过 Crypto++ 官方向量（3 组：key=IV=0 / IV=01 / key=55）。 |
| trivium | Trivium 流密码 | Trivium（80-bit key + 80-bit IV，288-bit 状态）。encode: 明文→Hex 密文；decode: Hex→明文。对称可逆。兼容 风之暇想 fzxx/Trivium-Grain 在线站（trivium-grain.js.org），密文字节互通。 |
| grainV1 | Grain v1 流密码 | Grain v1（80-bit key + 64-bit IV，LFSR80+NFSR80+h）。encode: 明文→Hex 密文；decode: Hex→明文。对称可逆。兼容 风之暇想 fzxx/Trivium-Grain 在线站，密文字节互通。 |
| grain128aead | Grain-128AEAD 认证加密 | Grain-128AEAD（128-bit key + 96-bit nonce，真实 AEAD，64-bit tag）。encode: 明文+AD→Hex 密文(含尾 8 字节 tag)；decode: Hex→明文并验 tag，失败报错。兼容 风之暇想 fzxx/Trivium-Grain 在线站，密文字节互通。 |
| mickey | MICKEY-128 2.0 | MICKEY-128 2.0 流密码（Babbage & Dodd，eSTREAM Phase 3 决赛）：R/S 各 160 位双寄存器，不规则钟控（Control_R=S[54]^R[106]、Control_S=S[106]^R[53]）+ Galois 双反馈。128 位密钥 + 0~128 位 IV（MSB-first 装载）。官方 C 实现逐行移植，官方向量自检。自反 XOR：encode 文本→密文 hex，decode 反向。 |
| rc4Drop | RC4-drop / CipherSaber-2 | RC4-drop[n]（丢弃前 n 字节密钥流，RFC 6229 偏移档，默认 768=SANS 建议）与 CipherSaber-2（10 字节 IV 前置 + KSA 重复 r 轮，默认 r=20） |
| zuc | ZUC 祖冲之 | 国密流密码（GB/T 33133.1-2016，前身 GM/T 0001-2012，128 位密钥+128 位 IV，3GPP LTE 加密标准） |
| sosemanuk | Sosemanuk | Sosemanuk 流密码（eSTREAM 决赛算法，Berbain 2008）：LFSR（10×32bit 字，α 乘法反馈）+ FSM（r1/r2 + 条件选择）+ Serpent S2 盒扩散。key 128-256 位 + IV 128 位。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。照 eSTREAM 官方参考实现逐行移植，官方向量 2 组自检。 |
| spritz | Spritz 流密码 | Spritz 流密码（Rivest & Schuldt 2014 论文版）：a 计数器吸收 + 五索引状态海绵结构，输出双指针链式混合，抗 RC4 已知偏差。key（+ 可选 IV）文本或 hex 自动识别。自反 XOR：encode 文本→密文 hex，decode 密文 hex→文本。 |
| vmpc | VMPC 流密码 | VMPC 流密码（Zoltak 2004）：768 轮 KSA + 自反 XOR keystream，抗 RC4 已知攻击。模式 basic=Key→IV 两遍 / full=Key→IV→Key 三遍（更安全）。key/iv 文本或 hex 自动识别。encode 文本→密文 hex，decode 密文 hex→文本。 |
| xsalsa20 | XSalsa20 | XSalsa20 流密码（Bernstein「Extending the Salsa20 nonce」）：HSalsa20 派生 32 字节子密钥 + Salsa20/20，密钥 32 字节、nonce 24 字节、64 位块计数器（自反） |

### 现代密码·非对称（105 ops）

| opId | 名称 | 说明 |
|---|---|---|
| blsKeyGen | BLS 密钥生成 | BLS（Boneh–Lynn–Shacham）密钥生成：sk ∈ [1,n-1]，pk=[sk]G2。构造跑在项目 BN254/SM9 曲线（教学口径，非 BLS12-381，与 ETH2 不互通） |
| blsSign | BLS 签名 | BLS 签名：σ = [sk·H(m)]G1，H 复用 SM9 H1（域分隔 0x42）。签名 65B G1 点；同域签名可点加聚合（见聚合验签） |
| blsVerify | BLS 验签 | BLS 验签：e(σ,G2) ?= e(H(m)·G1, pk)。主输入填原消息；参数填公钥与签名 |
| blsAggVerify | BLS 聚合验签 | Boneh 原始聚合验签：n 组 (pk, 消息, 签名) 一次配对检查。主输入每行一组：pk_hex 空格 签名_hex；消息放参数框逐行对应 |
| rsaGenKeyPair | RSA 密钥对生成 | 本地生成 RSA 密钥对（纯 JS BigInt，素数 Miller-Rabin 复用 primeGen），输出十进制 n/e/d/p/q/dp/dq/qinv + PEM（PKCS#1 / PKCS#8 / SPKI 三选一，DER 编码按 ITU-T X.690）。私钥 / 公钥分开下载按钮（PEM 主交付，DER / JWK 次级可选）。512 位已被现实分解仅作教学，实际使用至少 2048 位；2048 位约秒级、4096 位数秒级会阻塞页面，属预期 |
| ecdsaKeyGen | ECDSA 密钥对生成 | ECDSA 密钥对生成：secp256k1 / P-256 / P-384 / P-521 任选，输出私钥 d 与公钥（压缩 02/03‖X + 非压缩 04‖X‖Y 双格式）。随机源 crypto.getRandomValues 拒绝采样无偏。域参数：SEC 2 v2 / FIPS 186-4 D.1.2。 |
| ecdsaSign | ECDSA 签名 | ECDSA 签名：输入消息（text/hex）+ 私钥 d，曲线 secp256k1/P-256/P-384/P-521，哈希 SHA-256/384/512，k 可选 RFC 6979 确定 k（可复现）或随机 k。输出 r,s 十进制+hex、DER hex、所用 k。RFC 6979 A.2.5 官方向量逐字验证。 |
| ecdsaVerify | ECDSA 验签 | ECDSA 验签：输入消息 + 公钥（压缩/非压缩/X‖Y hex 自动识别，G=生成元）+ 签名（r;s 十进制/hex 或 DER hex 自动识别）。曲线四条任选，哈希 SHA-256/384/512。输出 w/u1/u2/R 全过程与合法性判定。 |
| ecdsaSigConvert | ECDSA 签名格式转换 | ECDSA 签名三格式互转：raw r;s（十进制/0x hex）↔ DER（ASN.1 SEQUENCE{r,s}，ITU-T X.690）↔ JOSE（r\|\|s 定宽 base64url，RFC 7515）。曲线参数决定 JOSE/raw-hex 的元素定宽（P-256=32B 等）。 |
| eccCalc | ECC 点运算 | 椭圆曲线点运算计算器：点加/点减/标量乘/倍点。曲线四条预设（secp256k1/P-256/P-384/P-521）或自定义 p/a/b/Gx/Gy/n。点支持压缩 02/03‖X、非压缩 04‖X‖Y、裸 X‖Y、G（生成元）、O（无穷远点）；k 支持十进制/0x hex/负数。无穷远点输出 Infinity。 |
| pemToHex | PEM → DER | PEM（任意 BEGIN/END 标签）提取 DER 原始字节：base64 解码 + RFC 7468 §6 宽松清洗（剥空白、丢注脚行、跳过 EC PARAMETERS 参数块）。输出 DER hex 或 16 字节 hexdump。对拍可用 openssl asn1parse / xxd -r -p。附带规范 base64 与识别出的标签。不解析 DER 结构（解析见 PEM→JWK） |
| hexToPem | DER → PEM | DER（hex 或 base64）封装为 PEM：RFC 7468 §5.2 格式，64 字符折行。标签可选 RSA PRIVATE KEY / PRIVATE KEY / PUBLIC KEY / EC PRIVATE KEY / CERTIFICATE 或自定义。hex/base64 自动判别（auto 下全 hex 字符按 hex 处理）。附带尝试 DER 顶层解析提示（不强制合法 DER） |
| pemToJwk | PEM → JWK | PEM 私钥/公钥 → JWK JSON（RFC 7517/7518）。RSA：PKCS#1（RFC 8017 §A.1.2）/ PKCS#8（RFC 5208）/ SPKI（RFC 5280）→ n,e,d,p,q,dp,dq,qi；EC：SEC 1（RFC 5915）/ PKCS#8 / SPKI → crv,x,y,d，曲线 OID 映射 P-256/P-384/P-521（RFC 5480）+ secp256k1（RFC 8812 §3.2）。字段 base64url 无 padding（RFC 4648 §5）；缺公钥坐标时现算 d·G。附 n 位长与 x/y hex 行便于对拍 openssl -text |
| jwkToPem | JWK → PEM | JWK JSON → PEM。RSA 私钥出 PKCS#1 + PKCS#8 两块（RFC 8017 §A.1.2 / RFC 5208，CRT 参数缺 dp/dq/qi 时自动推导）；RSA 公钥出 SPKI（RFC 5280）。EC 私钥出 SEC 1 传统 + PKCS#8 两块（RFC 5915 / RFC 5480 §2.2，内嵌版按标准省略 [0] 曲线参数）；EC 公钥出 SPKI（BIT STRING = 04‖X‖Y）。私钥缺公钥坐标时现算 d·G 补全 |
| pubFromPriv | 私钥 → 公钥 | 由私钥提取公钥（PEM 或 JWK 输入）。RSA：公钥 = (n, e)，出 SPKI PEM（RFC 5280）+ JWK（RFC 7518 §6.3.1）。EC：公钥 = d·G 椭圆曲线点乘（雅可比坐标实现），出 SPKI PEM + JWK{crv,x,y}；曲线由私钥结构 OID（RFC 5480）或 JWK crv 字段判别。输出与 openssl pkey -pubout 可逐字节对拍 |
| x509Parse | X.509 证书解析 | 解析 X.509 证书（RFC 5280 §4.1）：PEM（CERTIFICATE）或 DER hex 输入。输出版本/序列号/签名算法（OID+名称，含 RSASSA-PSS 参数）/签发者与主体 DN（X.501 逐 RDN，CN/O/C 等 100+ OID 友好名 + RFC 4514 串）/有效期（UTCTime/GeneralizedTime + 过期判定，时间基准可参数覆盖）/公钥参数（RSA n 位长+e、EC 曲线+点、Ed25519/DSA）/扩展明细（SAN DNS/IP/email/URI、BasicConstraints CA、KeyUsage 位、SKID/AKID、EKU、AIA + 全扩展 OID 总表）/签名值 hex。对拍 openssl x509 -text -noout。负例（非证书 PEM/截断 DER）中文报错 |
| sshHostKeyParse | SSH 公钥解析（authorized_keys/known_hosts） | 解析 SSH 公钥：authorized_keys 行（ssh-ed25519 AAAA... comment）、known_hosts 行（含 @revoked/@cert-authority 标记与主机列表前缀）、RFC 4716 SSH2 公钥块（ssh-keygen -e 输出）或裸 base64 blob。按 RFC 4251 §5 wire 格式解出算法与参数（ssh-rsa n 位长+e / ssh-ed25519 32 字节公钥 / ecdsa-sha2-nistp256\|384\|521 曲线+点 / ssh-dss / sk-* FIDO 变体），输出 SHA-256（SHA256:xxx 无 padding base64）与 MD5 两版指纹（与 ssh-keygen -lf / -E md5 -lf 逐字一致）+ 规范行重建。不支持的 key 类型（如 SSH 证书）中文报错 |
| rsa | RSA | RSA 模幂加解密：加密 c=mᵉ mod n，解密 m=cᵈ mod n。支持 hex/base64 密文与明文字节串（解密直出 flag）；填 p,q 自动推 n 和 d。 |
| csrParse | CSR 证书请求解析（PKCS#10） | 解析 PKCS#10 证书签名请求（RFC 2986）：PEM（CERTIFICATE REQUEST / NEW CERTIFICATE REQUEST）或 DER hex 输入。输出版本/主体 DN（X.501 逐 RDN + RFC 4514 串）/公钥（RSA n 位长+e、EC 曲线+点、Ed25519）/attributes 属性（challengePassword RFC 2985 1.2.840.113549.1.9.7、extensionRequest 请求扩展展开）/签名算法+签名值，并按声明算法对 certificationRequestInfo 原始字节做一致性校验（RSA PKCS#1 v1.5 完整验签 RFC 8017 §8.2.2；ECDSA 验 r,s 结构与曲线位长）。对拍 openssl req -text -noout。负例（非 CSR PEM/截断 DER）中文报错 |
| crlParse | X.509 CRL 吊销列表解析 | 解析 X.509 证书吊销列表（RFC 5280 §5.1 CertificateList）：PEM（X509 CRL）或 DER hex 输出。输出版本/签发者 DN/thisUpdate/nextUpdate（含过期判定）/revokedCertificates 逐条（序列号 hex+十进制、吊销日期、entry 扩展：reasonCode 吊销原因枚举 §5.3.1、invalidityDate §5.3.2）/CRL 扩展（cRLNumber、deltaCRLIndicator、AKID §5.2）/签名算法（内外两处一致性校验 §5.1.1.2）+签名值。列表循环纯解析，10 万条 revoked 内性能可接受。对拍 openssl crl -text -noout。负例（非 CRL PEM/截断 DER）中文报错 |
| dsaParamGen | DSA 密钥对/参数组生成 | DSA 密钥对与参数组生成（FIPS 186-5 §A.1.1-§A.2.1）：q（N 位素数）→ p=k·q+1（L 位素数）→ g=h^((p-1)/q) mod p（阶 q 生成元）→ 私钥 x ∈ [1,q-1]，公钥 y=g^x mod p。仅认可现行 (L,N)=(2048,224)/(2048,256)/(3072,256)，1024 及以下已废止 |
| dsaSign | DSA 签名 | DSA 数字签名（FIPS 186-4 §4）：r=(g^k mod p) mod q，s=k⁻¹(z+x·r) mod q，k ∈ [1,q-1] 每消息唯一。hash 支持直接整数 H(m)（CTF 常态）或 SHA-1(消息文本)。输出含自检验签 |
| dsaVerify | DSA 验签 | DSA 验签（FIPS 186-4 §4）：0<r,s<q，w=s⁻¹ mod q，v=((g^u1·y^u2) mod p) mod q，通过 ⟺ v==r。hash 支持直接整数 H(m) 或 SHA-1(消息文本) |
| dsaReuseK | DSA 重用 k 攻击 | DSA nonce 重用攻击（CTF 高频）：两条签名用同一 k（表现为 r1==r2）时，k=(z1-z2)(s1-s2)⁻¹ mod q，x=(s1·k-z1)·r⁻¹ mod q。hash 支持直接整数 H(m) 或 SHA-1(消息文本)。可选填 p/g/y 反向校验 |
| ed25519KeyGen | Ed25519 密钥生成 | Ed25519 密钥生成（RFC 8032 §5.1.5）：私钥 32 字节随机（或给定）→ h=SHA-512(私钥)，a=clamp(h[0:32])，公钥 = encodePoint(a·B)。配套「签名/验签」档使用 |
| ed25519Sign | Ed25519 签名 | Ed25519 签名（RFC 8032 §5.1.6）：r=H(prefix‖M) mod L，R=r·B，k=H(R‖A‖M) mod L，S=(r+k·a) mod L，签名=R(32B)‖S(32B)。确定性签名（无随机 nonce）。输出含自检验签 |
| ed25519Verify | Ed25519 验签 | Ed25519 验签（RFC 8032 §5.1.7）：检查 8·S·B == 8·R + 8·k·A（实现用非批量 S·B == R + k·A）。输入公钥 (32B)、签名 (64B) 与消息 |
| ed448Sign | Ed448 签名 | Ed448 纯 EdDSA 签名（RFC 8032，SHAKE-256，57 字节密钥/114 字节签名，~224 位安全级）：私钥留空随机生成，输出公钥与签名。支持 context（可选）。过 RFC 8032 §7.4 九组官方向量 |
| ed448Verify | Ed448 验签 | Ed448 纯 EdDSA 验签（RFC 8032 §5.2.7）：公钥 + 114 字节签名 + 原消息，校验 [4][S]B = [4]R + [4][k]A。篡改消息/签名任一字节即失败 |
| x448KeyGen | X448 密钥生成 | Curve448 密钥对生成（RFC 7748）：私钥 56 字节随机（或给定）→ 公钥 = X448(clamp(私钥), 基点 5)。配套「X448 共享密钥」op 做 ECDH |
| x448Shared | X448 共享密钥 | Curve448 上的 ECDH（RFC 7748 §6.2）：双方私钥算共享密钥（两侧互验一致），或我方私钥 + 对方公钥直接算。共享密钥可下载 |
| elgamal | ElGamal | ElGamal 公钥加密：密文 (c1,c2)，c1=g^k c2=m·y^k，解密 m=c2·(c1^x)⁻¹。密文格式 c1,c2（逗号分隔） |
| elgamalKeyGen | ElGamal 密钥生成 | ElGamal 公钥密钥对一键生成（HAC §8.4.1）：安全素数 p=2q+1 + 原根 g + 私钥 x + 公钥 y=g^x。产物直接配套「ElGamal」op 的加密/解密参数 |
| gostSign | GOST R 34.10-2012 签名 | 俄罗斯国标 EC 签名（RFC 7091，哈希 Streebog-256/512 按参数集）：私钥留空随机生成，输出公钥 Q 与签名 ζ = R\|\|S（大端）。k 可固定供教学复算。过 RFC 7091 §7.2 官方向量 + pygost 对拍 |
| gostVerify | GOST R 34.10-2012 验签 | 俄罗斯国标 EC 验签（RFC 7091 §6.2）：公钥 Q(x,y) + 签名 ζ = R\|\|S + 原消息，复算 C = z1·P + z2·Q 比对 x(C) mod q。篡改任一环节即失败 |
| hqcKeyGen | HQC 密钥生成 | HQC-128/192/256（NIST 第四轮后量子 KEM，基于准循环伴随式译码）密钥对生成，seed 可固定复现。纯 JS 实现 |
| hqcEncrypt | HQC 加密 | HQC KEM 封装：明文（≤k 字节，右补零）封装为密文 c=u‖v‖salt 与共享密钥 SS(32B)；m/salt 可固定复现（SFO 变换口径） |
| hqcDecrypt | HQC 解密 | HQC KEM 解封装：输入私钥 dk + 密文 c，输出共享密钥 SS(32B) 与明文；密文篡改走隐式拒绝返回伪随机 K̄（含纠错译码） |
| knapsack | 背包加密（Merkle-Hellman） | Merkle-Hellman 背包公钥加密：私钥超递增序列 w+模数 q+乘数 r，公钥 β=w·r mod q；加密按 bit 求和，解密用 r⁻¹ 还原后贪心解背包。密文=逗号分隔十进制块。 |
| mldsaKeyGen | ML-DSA 密钥生成 | FIPS 204 ML-DSA-44/65/87（后量子签名）密钥对生成，种子 ξ 可固定复现（FIPS 204 §6.1 种子扩展），纯 JS 实现毫秒级 |
| mldsaSign | ML-DSA 签名 | FIPS 204 签名：私钥 sk + 消息（text/hex）+ 上下文 ctx(≤255B)；hedged 随机 rnd（§5.4 推荐）或确定性 rnd=0；Fiat–Shamir with aborts |
| mldsaVerify | ML-DSA 验签 | FIPS 204 验签：pk + 消息 + 签名 → 合法/不合法（含 sigDecode 严格结构检查、‖z‖∞ 与 hint 上限校验、c̃ 重算比对） |
| mlkemKeyGen | ML-KEM 密钥生成 | FIPS 203 ML-KEM-512/768/1024（后量子 KEM）密钥对生成，d/z 种子可固定复现（含 FO 变换）。纯 JS 实现，单次毫秒级 |
| mlkemEncaps | ML-KEM 封装 | FIPS 203 封装：输入公钥 ek，输出密文 ct 与共享密钥 SS(32B)；随机性 m 可固定复现（含 ek 类型/模数检查） |
| mlkemDecaps | ML-KEM 解封装 | FIPS 203 解封装：输入私钥 dk + 密文 ct，输出共享密钥 SS(32B)；密文被篡改时走隐式拒绝返回伪随机 K̄（含类型/哈希检查） |
| ntruKeyGen | NTRU 密钥生成（真参数） | EESS v3.1 口径真参数 NTRU（ees401ep1/ep2/ees439ep1/ees659ep1，q=2048）密钥对生成，产品式私钥 f=1+p·F1·F2+p·F3；与 ntruToy 玩具参数无关 |
| ntruEncrypt | NTRU 加密（真参数） | EESS v3.1 真参数 NTRU 加密：e = r∗h + m mod q（SVES 系数映射 + 随机 b 字段），被动安全核心 PKE（非完整 SVES CCA-2） |
| ntruDecrypt | NTRU 解密（真参数） | EESS v3.1 真参数 NTRU 解密：a = f∗e mod q → 中心化 (−q/2,q/2] → mod 3 → SVES 逆映射还原明文（含零填充/长度校验） |
| paillierKeyGen | Paillier 密钥对生成 | 生成 Paillier 密钥对（1999 论文口径）：等长素数 p,q → n=p·q，g=n+1，λ=lcm(p-1,q-1)，μ=(L(g^λ mod n²))⁻¹ mod n。公钥 (n,g) 加密，私钥 (λ,μ) 解密。原 demo 演示档已并入：生成密钥后接「加密 → 同态加 → 解密」三档即可跑通 E(m1)·E(m2)=E(m1+m2) 完整流程 |
| paillierEncrypt | Paillier 加密 | Paillier 公钥加密：明文 m ∈ [0,n)，选随机 r∈Z_n*（gcd(r,n)=1），c = g^m·r^n mod n²。g 留空按标准简化选取 n+1 |
| paillierDecrypt | Paillier 解密 | Paillier 私钥解密：m = L(c^λ mod n²)·μ mod n，其中 L(x)=(x-1)/n。输入密文 c（十进制 / 0x hex） |
| paillierHomAdd | Paillier 同态加 | Paillier 加法同态性质：E(m1)·E(m2) mod n² = E(m1+m2)。输入两个密文（逗号/空白分隔），输出可直接用「解密」档解出的和密文。CTF 高频：已知 n 时无需私钥即可对密文做加法篡改 |
| pgpGenKeyPair | PGP 密钥对生成 | PGP 密钥对生成（RFC 4880，openpgp.js v5.11.2）：Curve25519（默认）或 RSA-3072，可选口令保护私钥。输出 ASCII Armor 公/私钥块，公/私钥分开下载（私钥 ⚠ 敏感） |
| pgpEncrypt | PGP 加密 | PGP 加密（RFC 4880 CFB/EAX，openpgp.js）：明文 + 公钥块 → ASCII Armor 密文；可选附带私钥签名（先签后加） |
| pgpDecrypt | PGP 解密 | PGP 解密（openpgp.js）：ASCII Armor 密文 + 私钥块（+口令）→ 明文；密文若带签名顺带给出验签结果 |
| pgpSign | PGP 签名 | PGP 签名（RFC 4880，openpgp.js）：明文 + 私钥块 → cleartext signed（可读签名文本）；产物 .sig |
| pgpVerify | PGP 验签 | PGP 验签（openpgp.js）：签名文本/分离签名 + 公钥块 → 合法/不合法 + 签名人 |
| pgpEncryptAndSign | PGP 加密并签名 | PGP 加密并签名（先签后加密，openpgp.js）：明文 + 对方公钥 + 本方私钥 → 密文（内嵌签名） |
| pgpDecryptAndVerify | PGP 解密并验签 | PGP 解密并验签（openpgp.js）：密文 + 本方私钥 + 签名者公钥 → 明文 + 验签结论 |
| pgpParseKey | PGP 密钥解析 | PGP 密钥解析（RFC 4880 包结构，openpgp.js）：公/私钥块 → KeyID/算法/创建时间/指纹/用户ID/子钥表/能力标志 |
| lweToy | LWE 玩具加解密 | 后量子教学：Regev LWE（q=257, n=8）比特加解密演示——理解格密码公钥机制（非生产参数） |
| ntruToy | NTRU 玩具加解密 | 后量子教学：NTRU 截断多项式环（n=8, q=257, p=3）加解密演示——理解 NTRU 机制（非生产参数） |
| sm2KeyGen | SM2 密钥对生成 | 生成 SM2（sm2p256v1，GB/T 32918.5-2017 附录 A 基点）密钥对：私钥 d ∈ [1,n-1]，公钥 P=dG。私钥/公钥（非压缩与压缩格式）分开下载（T362 产物协议） |
| sm2Encrypt | SM2 加密 | SM2 公钥加密（GB/T 32918.4-2016）：用对方公钥 (x,y) 加密，输出 C1\|\|C3\|\|C2 或 C1\|\|C2\|\|C3 序密文（hex/base64/utf8 可选） |
| sm2Decrypt | SM2 解密 | SM2 私钥解密（GB/T 32918.4-2016）：输入 SM2 密文（04 前缀，hex/base64），用私钥 d 解出明文。自动适配 C1\|\|C3\|\|C2 / C1\|\|C2\|\|C3 序 |
| sm2Sign | SM2 签名 | SM2 数字签名（GB/T 32918.2-2016）：ZA=SM3(ENTL\|\|ID_A\|\|a\|\|b\|\|G\|\|P\|\|d)，e=SM3(ZA\|\|M)，输出 r\|\|s（各 32 字节 hex 拼接）。填公钥 (x,y) 可按标准推导 Za，不填则按旧口径直接对 M 签 |
| sm2Verify | SM2 验签 | SM2 验签（GB/T 32918.2-2016）：输入消息 + 签名 r/s（各 32 字节 hex）+ 公钥 (x,y) + ID_A，重算 SM3(ZA\|\|M) 校验 (r,s) 有效性 |
| sm2KeyExchange | SM2 密钥交换 | SM2 密钥交换协议（GB/T 32918.3-2016）：双方私钥 + ID 推导会话密钥 K（1..65536 bit 可选），输出临时点 R_A/R_B 与 S1/S2 确认值（演示口径：临时随机数内部生成） |
| merkleProve | Merkle 包含证明 | SHA-256 Merkle 树：主输入每行一个叶子，参数给叶子序号（0 起）→ 输出根、叶子哈希与兄弟路径；单叶奇数位补自身（Bitcoin 口径） |
| merkleVerify | Merkle 证明验证 | 验证 Merkle 包含证明：主输入填叶子原文，参数填根/路径 JSON（merkleProve 产物） |
| pedersenCommit | Pedersen 承诺 | 椭圆曲线 Pedersen 承诺 C = m·G + r·H（SM2 群，H 为确定性派生第二基点）：计算性隐藏 m、完美绑定向量承诺；参数给 r 或留空随机，勾选验证则以承诺+明文+盲化子打开校验 |
| feldmanVss | Feldman VSS | Feldman 可验证秘密分享（t-out-of-n，SM2 群）：多项式 f(x)=s+a₁x+…+a_{t−1}x^{t−1}，份额 (i, f(i))，承诺 A_j=[a_j]G——份额可独立验证且不泄露 s。勾选验证模式校验单份份额 |
| lsagSign | LSAG 环签名 | LSAG 环签名（Liu–Wei–Wong 2004，SM2 群）：n 选一匿名签名 + key image 可链接（同私钥在同环的两签可被关联）。主输入填消息；参数填环公钥列表（每行 04x‖y）、签名者私钥与其在环中的 index |
| lsagVerify | LSAG 环签名验证 | LSAG 验签：主输入填原消息；参数填环公钥列表与签名 JSON（lsagSign 产物）。同 key image 的两签即同签者（可链接） |
| rabin | Rabin 密码 | Rabin 公钥密码（p≡q≡3 mod4）：加密 c=m² mod n，解密用 CRT 求 4 个平方根 + 尾部魔数消歧。纯 BigInt 本地计算。 |
| rsaParams | RSA 参数计算（p,q→n,φ,d） | 由 p,q,e 推导 n、φ(n)、d、dp、dq、qinv（参数框填 p 和 q，十进制；主输入框不再使用） |
| rsaModinv | 模逆（a⁻¹ mod m） | 扩展欧几里得求 a 在模 m 下的乘法逆元；双向自反（encode/decode 互逆：inv(inv(a))=a）（参数框填 a 和 m，十进制；主输入框不再使用） |
| rsaEgcd | 扩展欧几里得（Bézout） | 求 gcd(a,b) 及 Bézout 系数 x,y 使 a·x + b·y = g（参数框填 a 和 b，十进制；主输入框不再使用） |
| rsaCrt | 中国剩余定理 CRT | 合并同余方程组 x ≡ r_i mod m_i（残差、模数各一框，逗号分隔） |
| rsaModpow | 大数快速幂（base^exp mod m） | BigInt 模幂运算（参数框填 base、exp、mod，十进制；主输入框不再使用） |
| rsaSign | RSA 签名 | RSASSA PKCS#1 v1.5 与 PSS 签名（RFC 8017）：EM 按 §9.2/§9.1 构造后 s = EM^d mod n（modPow 复用 primeGen）。私钥支持十进制 n,d 或 PEM（PKCS#1 RSA PRIVATE KEY / PKCS#8 PRIVATE KEY）。PSS 盐长默认 hLen；同钥同文两次签名不同是 PSS 随机盐的预期行为。512 位模数跑不了 SHA-256 以上的 PSS（emLen < hLen+sLen+2），换大钥或减盐长 |
| rsaVerify | RSA 验签 | RSASSA PKCS#1 v1.5 与 PSS 验签（RFC 8017 §8.2.2/§8.1.2）：s^e mod n 恢复 EM 后逐项校验（v1.5 重算 EM 逐字节比较；PSS 查 0xbc 哨兵/左位零/DB 结构/H 重算），输出合法/不合法与失败位置。公钥支持十进制 n,e 或 PEM（PUBLIC KEY SPKI / RSA PUBLIC KEY）。签名 hex 或十进制。PSS 盐长可选自动反推 |
| schnorrKeyGen | Schnorr 密钥对生成 | 生成 Schnorr 密钥对（secp256k1）：私钥 d ∈ [1,n-1]，公钥 P=d·G。配套「签名/验签/nonce 重用攻击」档使用 |
| schnorrSign | Schnorr 签名 | 经典 Schnorr 签名（secp256k1，挑战 e=H(R.x‖P.x‖m) mod n）：R=k·G，s=(k+e·d) mod n，签名=(e,s)。私钥留空随机。⚠ 两条消息复用同一 nonce k 会泄露私钥（教学可用） |
| schnorrVerify | Schnorr 验签 | Schnorr 验签：R' = s·G − e·P，e' = H(R'.x ‖ P.x ‖ m) mod n，e' == e 即有效。输入公钥 (Px,Py)、签名 (e,s) 与消息 |
| schnorrReuseK | Schnorr nonce 重用攻击 | Schnorr nonce 重用攻击（ECDSA 重用 k 的姊妹题）：同一私钥、同一 k 签两条不同消息 ⇒ d=(s1−s2)/(e1−e2) mod n，k=s1−e1·d mod n。输入两条签名 (e1,s1)(e2,s2) |
| slhdsaKeyGen | SLH-DSA 密钥生成 | FIPS 205 SLH-DSA-SHA2（后量子哈希签名）密钥对生成，种子 3n 字节可固定复现（Alg 18），纯 JS。顶层子树建房 2^树高 个 WOTS 叶子，秒级起 |
| slhdsaSign | SLH-DSA 签名 | FIPS 205 签名：私钥 sk + 消息（text/hex）+ 上下文 ctx(≤255B)；hedged 随机 rnd 或确定性 rnd=空（Alg 22，R=HMAC(sk_prf, addrnd‖0x00‖\|ctx\|‖ctx‖M)）。纯哈希树 WOTS+/FORS/hypertree 逐层建房，128s/192s/256s 生成秒级起（~10^5 次哈希），128f 快但签名大 |
| slhdsaVerify | SLH-DSA 验签 | FIPS 205 验签：pk + 消息 + 签名 → 合法/不合法（FORS+HT 路径重算根节点比对公钥根）；签名长度不符直接判非法 |
| sm9KeyGen | SM9 密钥生成 | SM9 标识密码密钥体系生成（GB/T 38635.2-2020）：签名 ks/加密 ke 双主密钥对（随机，可注入固定值复现向量）+ 按指定 uid 派生用户签名私钥（G1）/加密私钥（G2）与用户公钥。KGC 模式：用户公钥=标识，无需证书 |
| sm9Sign | SM9 签名 | SM9 标识数字签名（GB/T 38635.2-2020）：签名主公钥（G2）+ 用户签名私钥（G1）+ 消息 → 签名 (h, S)。h 为 32 字节 hex，S 为 G1 点 65 字节（04‖x‖y）。支持固定 r 复现官方向量 |
| sm9Verify | SM9 验签 | SM9 标识验签（GB/T 38635.2-2020）：签名主公钥（G2）+ 签名人 uid + hid + 消息 + 签名 (h, S) → 有效/无效。双线性对 e(S,PA)·g^h 重算 H2 比对 |
| sm9Encrypt | SM9 加密 | SM9 标识加密（GB/T 38635.4-2020）：加密主公钥（G1）+ 收件人 uid → 密文 C1‖C3‖C2（C1 为 64 字节 x‖y）。只需对方标识即可加密，无需对方证书；支持固定 r 复现官方向量 |
| sm9Decrypt | SM9 解密 | SM9 标识解密（GB/T 38635.4-2020）：用户加密私钥（G2）+ 收件人 uid + 密文 C1‖C3‖C2 → 明文。C3 校验失败（篡改/错 uid/错私钥）即报错 |
| x25519KeyGen | X25519 密钥生成 | X25519 密钥生成（RFC 7748）：私钥 32 字节随机（或给定）→ 公钥 = X25519(clamp(私钥), 基点 9)。配套「共享密钥」两档做 ECDH |
| x25519Shared | X25519 共享密钥（双方私钥） | X25519 ECDH（RFC 7748 §6.2，教学口径：本地同时持有 A/B 双方私钥）：K = X25519(a, B公钥) == X25519(b, A公钥)，输出两侧互验一致 |
| x25519SharedFromPub | X25519 共享密钥（私钥+对方公钥） | X25519 ECDH（RFC 7748 §6.2，实战口径）：只持己方私钥 + 对方公钥，K = X25519(私钥, 对方公钥)。与「双方私钥」档结果一致 |
| xmssKeyGen | XMSS 密钥生成 | RFC 8391 XMSS-SHA2_10_256（n=32,w=16,h=10）密钥对生成，纯 JS。SK_SEED/SK_PRF/PUB_SEED 各 32B hex 可固定复现；默认随机。树建房 2^10 个 WOTS+ 叶子（约百万次哈希，数秒）。⚠ 状态签名：idx 不可重用 |
| xmssSign | XMSS 签名 | RFC 8391 XMSS-SHA2_10_256 签名：R=PRF(SK_PRF,idx)，M'=H_msg(R‖root‖idx‖M)，WOTS+ 签 M' + 认证路径。签名 2500B=idx(4)‖R‖WOTS(2144)‖auth(320)。⚠ 真实使用必须维护 state，index 重用=私钥泄露 |
| xmssVerify | XMSS 验签 | RFC 8391 XMSS-SHA2_10_256 验签：WOTS_pkFromSig → L-tree → 认证路径重算根节点，比对公钥 root。pk 64B（root‖PUB_SEED）或 68B（含 OID）。签名长度不符/index 超界直接判非法 |
| lmsSign | LMS/HSS 签名 | RFC 8554 LMS 单级或 HSS 两级签名（SHA-256，h=5/10，w=4/8），私钥按 Appendix A 从 SEED 伪随机派生（x=H(I‖q‖i‖0xff‖SEED)）。SEED/I/C 固定即可复现官方向量（TC2 口径）。⚠ 状态签名：q 不可重用 |
| lmsVerify | LMS/HSS 验签 | RFC 8554 验签：HSS 多级（逐层 LMS 验签，签名自描述解析）或 LMS 单级。LM-OTS 公钥候选 Kc → D_LEAF/D_INTR 逐层重算根 → 比对 K。支持官方向量 TC1/TC2 的公钥+签名直接粘贴 |
| xwingKeyGen | X-Wing 密钥生成 | X-Wing 混合 KEM（X25519+ML-KEM-768，draft-connolly-cfrg-xwing-kem）密钥生成：32B 种子 SHAKE256 扩展 96B 派生双组件，pk=ML-KEM ek(1184B)‖X25519 公钥(32B)。种子可固定复现 |
| xwingEncaps | X-Wing 封装 | X-Wing 封装：输入公钥 pk(1216B)，ct=ML-KEM ct(1088B)‖X25519 临时公钥(32B)，ss=SHA3-256(ss_M‖ss_X‖ct_X‖pk_X‖"\./""/^\")。eseed 可固定复现官方测试向量 |
| xwingDecaps | X-Wing 解封装 | X-Wing 解封装：输入密文 ct(1120B) + 私钥 sk(32B 种子)，从种子重扩展双组件解出 ss。密文被篡改时走 ML-KEM 隐式拒绝路径（输出不可预测值） |

### 现代密码·其他（29 ops）

| opId | 名称 | 说明 |
|---|---|---|
| ascon | Ascon-AEAD128 | NIST SP 800-232 轻量级认证加密（2025 标准版）：rate 128bit、初始化/终结 p[12]、数据块 p[8]、IV 0x00001000808c0001、小端字节序（与 v1.2 互不通用）。key/nonce 各 16 字节 hex，nonce 留空加密时随机；解密校验 tag 不符即报错。NIST LWC KAT + ACVP 官方向量验证。 |
| ror13Hash | ROR13 API 哈希 | PE 恶意软件 API 哈希（32 位循环右移 13 累加）。对输入逐字节累加 + ROR 13，输出 8 位 hex 哈希。单向不可逆。常见 API 权威向量: LoadLibraryA=0xEC0E4E8E、GetProcAddress=0x7C0DFCAA。 |
| byteArith | 字节算术 (mod 256) | 逐字节算术运算模 256。encode 按 op(add/sub/mul) + key 运算→Hex；decode 逆运算还原。mul 仅奇数 key 可逆（偶数无模 256 逆元）。 |
| bwt | BWT 块排序变换 | Burrows-Wheeler 变换（bzip2 核心，可逆不加密）。encode 输出 'BWT串\|primary'；哨兵模式末尾加 $ 无需 primary。decode 用 LF-mapping 还原 |
| fernet | Fernet | 对称令牌（AES-128-CBC + HMAC-SHA256，key 为 base64url 32 字节） |
| xorStrings | XOR 循环补齐 | 循环异或：明文与密钥短侧各自循环补齐到较长一侧再异或（自反） |
| dlp | 离散对数求解（DLP） | 求解 g^x ≡ h (mod p) 中的 x。BSGS（小阶 O(√n)）/ Pollard rho（大阶省内存）双策略，纯 BigInt。h 可填主输入框。 |
| flaskSessionDecode | Flask Session 解码 | 解 Flask session cookie（itsdangerous v1/v2 通用：payload.timestamp.signature，payload=base64url 可选 zlib 压缩 JSON）→ JSON + 时间戳；填 secret 可顺带验签 |
| flaskSessionSign | Flask Session 签发 | JSON payload + secret → 完整 Flask session cookie（itsdangerous HMAC-SHA1 默认；zlib 自动压缩按其dangerous 规则） |
| flaskSessionVerify | Flask Session 验签 | 重算 HMAC 签名常数时间比对 → 合法/不合法 + 时间戳 + maxAge 过期检查 |
| jwtCrack | JWT 密钥爆破（小字典演示） | HS256/384/512 签名 JWT 的弱密钥小字典演示：内置弱密钥 + 自定义 + 纯数字，重算 HMAC 签名逐个比对。本工具不做大规模爆破——大字典请用 hashcat -m 16500（https://hashcat.net）或 John the Ripper 的 JWT 格式。算法自动识别自 header（可强制指定）；RS/ES 等非对称签名拒绝 |
| jwt | JWT | JSON Web Token 签发(HS256/384/512)/解析+验签 |
| jwtNone | JWT None 攻击 | alg:none 无签名 JWT 构造 / 攻击检测 |
| jweIdentify | JWE 结构识别 | JWE 紧凑序列化 5 段拆解（RFC 7516） |
| pasetoIdentify | PASETO 识别 | PASETO 令牌结构识别（v1-v4 / local / public） |
| jwtSign | JWT 签发 | JWT 签发（HS256/384/512 + RS256 + ES256，RFC 7519/7518） |
| jwtVerify | JWT 验签 | JWT 三段解析 + 重算签名比对（HS*/RS256/ES256），指出不匹配段 |
| hotp | HOTP | HOTP 计数器一次性密码（RFC 4226，input=密钥；HMAC + 动态截断） |
| totp | TOTP | TOTP 时间一次性密码（RFC 6238，input=密钥；time=0 用当前时间） |
| bb84Qkd | BB84 量子密钥分发仿真 | BB84 协议教学仿真（Bennett-Brassard 1984 / Gisin et al. 2002）：随机基矢发送-测量 → 基矢比对筛密 → 抽样估误码率检出窃听 → 剩余为最终密钥。支持信道误码率、Eve 截获-重发窃听率、可复现种子。Eve 全拦时筛后误码率 ≈ 25% |
| shamir | Shamir 秘密共享 | Shamir's Secret Sharing（GF(2^8)）：encode 把秘密拆成 n 份分片（阈值 k），decode 用任意 ≥k 份还原。少于 k 份无法得到秘密任何信息（信息论安全）。分片格式：每行 x:hex。 |
| jwsSign | JWS 签发 | JWS 签发（RFC 7515 compact）：HS256/384/512 对称、RS256（RSA PKCS#1 v1.5）、ES256（P-256）。header/payload JSON + 密钥 → JWS；产物 token.jws。RFC 7515 A.2.1 官方向量逐字验证 |
| jwsVerify | JWS 验签 | JWS 验签（RFC 7515 compact）：重算签名逐字节比对，输出合法/不合法 + payload + header 全字段 |
| jweEncrypt | JWE 加密 | JWE 加密（RFC 7516 compact）：dir+AES-256-GCM（alg=dir, enc=A256GCM）——CEK 直接给 32B hex；四段输出。RFC 7516 A 组向量结构验证 |
| jweDecrypt | JWE 解密 | JWE 解密（RFC 7516 compact，dir+A256GCM）：重算 GCM 认证标签，输出明文 + header 全字段；篡改任一段必拒 |
| pasetoV4Sign | PASETO v4 签发（public） | PASETO v4.public 签发（协议规范 §4.1，Ed25519）：payload JSON + Ed25519 私钥 hex（64B 种子‖公钥）+ 可选 footer/implicit → v4.public token。v4.local（XChaCha20）暂不支持 |
| pasetoV4Verify | PASETO v4 验签（public） | PASETO v4.public 验签：token + Ed25519 公钥（32B hex）→ 合法/不合法 + payload + footer；PAE 域分离防拼接（协议规范 §4.1） |
| godzillaPhpXorBase64 | 哥斯拉 PHP_XOR_BASE64 | Godzilla webshell PHP_XOR_BASE64 流量解密（base64 + XOR，偏移 key[(i+1)&15]）。key 默认 3c6e0b8a9c15224a（密钥「key」派生） |
| behinderAesEcb | 冰蝎 AES-ECB | Behinder(冰蝎) v3 默认 AES-128-ECB 流量解密（base64 + AES-ECB）。key 默认 e45e329feb5d925b（密码「rebeyond」派生） |

### 哈希 / 校验（66 ops）

| opId | 名称 | 说明 |
|---|---|---|
| asconHash | Ascon-Hash256 | NIST SP 800-232 轻量级哈希：sponge 结构、rate 64bit、全程 p[12] 轮置换、IV 0x0000080100cc0002、小端字节序，输出 32 字节摘要。注意与老 Ascon-Hash(v1.2) 的 IV/字节序/填充均不同，结果不通用。NIST LWC KAT + ACVP 官方向量验证。 |
| balloon | Balloon 密钥派生 | Balloon 内存硬口令 KDF（Boneh/Corrigan-Gibbs/Schechter 2016，SHA-256 实例）：盐参与伪随机访问模式（原版设计），delta=3 伪随机块混入。抗 GPU/ASIC 暴力。参数 sCost（空间块数）/tCost（轮数）/delta。 |
| bcrypt | Bcrypt | Bcrypt 口令哈希 / 校验（OpenBSD，$2a$/$2b$/$2y$，EksBlowfish，cost 4-31） |
| blake3 | BLAKE3 | BLAKE3 加密哈希（O'Connor/Aumasson/Neves/Wilcox-O'Hearn 2020）：BLAKE2 G 函数 + Merkle 树 + 无限输出（XOF）。7 轮压缩，chunk=1024 字节。默认 32 字节输出，可扩展。官方 test_vectors 验证。 |
| sm3 | SM3 | 国密哈希（GB/T 32905-2016，前身 GM/T 0004-2012，256 位，国内 CTF 高频） |
| ripemd160 | RIPEMD-160 | RIPEMD-160 消息摘要（160 位，比特币地址用） |
| blake2b | BLAKE2b | BLAKE2b 哈希（RFC 7693，最多 64 字节输出，默认 512 位） |
| blake2s | BLAKE2s | BLAKE2s 哈希（RFC 7693，最多 32 字节输出，默认 256 位） |
| adler32 | Adler-32 | Adler-32 校验和（RFC 1950，zlib 用，32 位） |
| crc8 | CRC-8 | CRC-8/SMBus（poly=0x07，8 位校验） |
| crc8_maxim | CRC-8/MAXIM | CRC-8/MAXIM（Dallas 1-Wire，poly=0x31 反射，8 位校验） |
| crc64 | CRC-64 | CRC-64/ECMA-182（poly=0x42F0E1EBA9EA3693，64 位校验；与 CRC-64/XZ 参数不同） |
| crc32c | CRC-32C | CRC-32C/Castagnoli（poly=0x1EDC6F41，iSCSI/ext4/SSE4.2，与 IEEE CRC32 不同） |
| fnv1a | FNV-1a | FNV-1a 非加密哈希（位宽可选 32/64；32 位 offset=0x811C9DC5/prime=0x01000193，64 位 offset=0xCBF29CE484222325/prime=0x100000001B3） |
| murmur3_32 | MurmurHash3-32 | MurmurHash3 x86 32 位非加密哈希（seed=0，CTF/一致性哈希高频） |
| md5 | MD5 | MD5 消息摘要（128 位，RFC 1321，纯 JS） |
| md4 | MD4 | MD4 消息摘要（128 位，RFC 1320，纯 JS，NTLM 基础） |
| sha1 | SHA-1 | SHA-1 消息摘要（160 位，WebCrypto） |
| sha256 | SHA-256 | SHA-256 消息摘要（256 位，WebCrypto） |
| sha384 | SHA-384 | SHA-384 消息摘要（384 位，WebCrypto） |
| sha512 | SHA-512 | SHA-512 消息摘要（512 位，WebCrypto） |
| hmac | HMAC | HMAC 消息认证码（参数：密钥 + 哈希算法，WebCrypto） |
| crc32 | CRC32 | CRC32 校验（IEEE 802.3，查表法） |
| crc16 | CRC16 | CRC16 校验（CCITT-FALSE，多项式 0x1021） |
| ntlm | NTLM | NTLM 哈希（MD4 of UTF-16LE 密码，Windows 密码存储） |
| sha3 | SHA-3 | SHA-3（FIPS 202，纯 JS Keccak，位宽可选 224/256/384/512） |
| keccak256 | Keccak-256 | Keccak-256（以太坊，padding 0x01，256 位） |
| shake128 | SHAKE128 | SHAKE128 可扩展输出（FIPS 202，参数：输出字节数） |
| shake256 | SHAKE256 | SHAKE256 可扩展输出（FIPS 202，参数：输出字节数） |
| crcGeneric | 通用 CRC（参数化） | CRC 通用计算（width/poly/init/refIn/refOut/xorOut 可配置，含 CRC-16/CRC-32 常用预设）。run 单向，输出十六进制 |
| crc16Modbus | CRC-16/MODBUS | CRC-16/MODBUS（poly=0x8005, init=0xFFFF, refIn/refOut=true, xorOut=0x0000，Modbus RTU 用） |
| crc16CcittTrue | CRC-16/CCITT-FALSE | CRC-16/CCITT-FALSE（poly=0x1021, init=0xFFFF, refIn/refOut=false, xorOut=0x0000） |
| crc16Arc | CRC-16/ARC | CRC-16/ARC（poly=0x8005, init=0x0000, refIn/refOut=true, xorOut=0x0000，LHA/ARC 用） |
| crc16Xmodem | CRC-16/XMODEM | CRC-16/XMODEM（poly=0x1021, init=0x0000, refIn/refOut=false, xorOut=0x0000，XMODEM 协议用） |
| fletcher | Fletcher | Fletcher 校验和（位宽可选 8/16/32/64；8 位模 15，16 位按字节流模 255，32 位按 16 位字小端模 65535，64 位按 32 位字小端模 2^32-1） |
| bsdSum | BSD checksum | BSD checksum（4-bit rotated sum，BSD `sum` 命令，输出 16 位） |
| sysvSum | SysV checksum | SysV checksum（16 位累加 + 折叠，SysV `sum` 命令，输出 16 位） |
| cityhash | CityHash 非加密哈希 | CityHash 高速非加密哈希（Google cityhash）：CityHash32/64 + WithSeed/WithSeeds。Murmur 风格混合，非加密不抗碰撞，用于哈希表/指纹/去重。输入 text/hex，输出 hex，完全单向。已过官方 city-test 向量。 |
| kmac | KMAC | KMAC128/KMAC256 消息认证码（NIST SP 800-185，cSHAKE） |
| cmacExt | CMAC 扩展 | 通用 CMAC 消息认证码（ISO/IEC 9797-1 / RFC 4493 结构），底层分组密码可选 Camellia/SEED/Twofish/RC6（128 位块 Rb=0x87）或 IDEA/Blowfish/CAST-128（64 位块 Rb=0x1B）。单块 KAT 逐字背书。 |
| verhoeff | Verhoeff 校验 | 二面体群 D₅ 五阶校验位算法（d 乘法表 + p 置换表 + inv 逆表）：validate 校验 / generate 算校验位 / strip 去校验位；捕获全部单字错误与大多数换位错误 |
| lmHash | LM Hash | Windows LM Hash（口令转大写→14 字节→双 DES-ECB 加密 KGS!@#$%） |
| evpBytesToKey | EVP_BytesToKey | OpenSSL 口令派生 key/iv（openssl enc -k 的派生算法，默认 MD5，count=1） |
| streebog | Streebog（GOST R 34.11-2012） | 俄罗斯国标哈希 Streebog（GOST R 34.11-2012 / RFC 6986）：512 位输出（可选 256 位截断），Merkle-Damgård + 12 轮压缩函数，信创与俄系赛题常见。参数 len=512/256。过 RFC 6986 §10 官方向量。 |
| grostl | Grøstl | Grøstl 哈希（NIST SHA-3 决赛五强之一，Thomsen/Matusiewicz，公钥密码学背景）：Grøstl-256 用 512 位状态、Grøstl-512 用 1024 位状态，两个并行置换 P/Q 的宽管道压缩 h'=h⊕Q(m)⊕P(h⊕m)，双射结构保证高速。已过 C oracle（官方 NIST 提交编译）交叉验证。 |
| argon2 | Argon2 KDF（Argon2d/i/id） | RFC 9106 口令密钥派生（PHC 冠军），内存困难型，Argon2d/i/id 三型可选 |
| tiger | Tiger / Tiger2 哈希（192-bit） | Anderson-Biham Tiger/192（ED2K/TTH 等 P2P 场景常见）；Tiger2 为 0x80 填充变体 |
| kupyna | Kupyna 哈希（DSTU 7564:2014） | 乌克兰国家标准哈希（Grøstl 近亲），256/384/512 位输出可选 |
| md6 | MD6 | MD6 哈希（Rivest 2008 NIST SHA-3 提案，未终选无 RFC 终稿；Merkle 树结构，默认 256 位） |
| snefru | Snefru | Snefru 哈希（Merkle 1990，Snefru 2.5a，8 轮，128/256 位；输出已被碰撞攻击削弱，仅 CTF 历史） |
| sha0 | SHA-0 | SHA-0（FIPS 180 原版 1993，被 SHA-1/FIPS 180-1 替换，仅历史兼容；与 SHA-1 唯一差异是消息扩展不旋转） |
| has160 | HAS-160 | HAS-160（韩国 KISA TTAS.KO-12.0011/R2，KCDSA 配套摘要，160 位） |
| gostHash | GOST R 34.11-94 | 老 GOST 哈希（RFC 5831，基于 GOST 28147-89；注意与本箱 Streebog 的 GOST R 34.11-2012 是两个不同算法） |
| jh | JH | JH 哈希（NIST SHA-3 决赛五强之一，Hongjun Wu 清华/新加坡南阳理工）：1024 位 bitslice 状态，42 轮 E8 双射 + MDS 扩散，JH-224/256/384/512 四种输出。bitslice 设计使其在 Intel 平台高速实现。已过 C oracle（官方参考编译）交叉验证。 |
| pbkdf2 | PBKDF2 | PBKDF2 密钥派生（RFC 2898/8018，input=口令，输出 hex；CTF 高频） |
| hkdf | HKDF | HKDF 密钥派生（RFC 5869，input=IKM 输入密钥材料，输出 hex） |
| lyra2 | Lyra2 密钥派生 | Lyra2 内存硬口令 KDF（PHC 2014，Blake2b 海绵位率 768bit）：reduced-round duplex 填充内存矩阵 + 奇偶轮 Wandering 随机访问。抗 GPU/ASIC 暴力。参数 tCost（轮数）/mCost（行数，≥2）/nCols（basil 参数）/kLen。 |
| md2 | MD2 | MD2 消息摘要（128 位，RFC 1319，256 字节置换表 + 校验字节，纯 JS） |
| pearson | Pearson 哈希 | Pearson 快速哈希（CACM 1990）：h:=T[h^c] 逐字节迭代，T 为 0..255 置换表（Wikipedia 参考表）。极简非加密哈希，多字节输出用首字节替身扩展。可选输出 1..32 字节。 |
| scrypt | scrypt 密钥派生 | scrypt 内存硬化口令密钥派生（RFC 7914）：Salsa20/8 + BlockMix + ROMix 内存硬化，抗 ASIC/GPU 爆破。用于磁盘加密、加密货币钱包、口令存储。参数 N（2 的幂）/r/p/dkLen。 |
| siphash | SipHash-2-4 / 1-3 | SipHash 键控 64 位 PRF/MAC（Aumasson-Bernstein 2012）：哈希表抗碰撞标准（Python/Rust 等运行时用）。16 字节密钥，输出 64 位。支持 SipHash-2-4（默认）与 SipHash-1-3。 |
| skein | Skein | Skein 哈希（NIST SHA-3 决赛候选，Threefish 可调分组密码 Miyaguchi-Preneel 模式）：Skein-256/512/1024 状态，输出 224~1024 位。SHA-3 决赛圈里以速度著称，Skein-512-512 与 Threefish 同核。已过 Skein3Fish skein_golden_kat.txt 官方向量。 |
| ssdeep | SSDEEP 模糊哈希 | CTPH 上下文触发分段哈希（ssdeep 同源）：数据 → blocksize:hash1:hash2 签名，两签名比对出 0-100 相似度；找同源/变种样本（改几个字节分数仍高）。算法逐行对照 ssdeep 官方 fuzzy.c，过 C 库官方向量 |
| whirlpool | Whirlpool | Whirlpool 哈希（Barreto & Rijmen，ISO/IEC 10118-3:2004）：512 位输出，Miyaguchi-Preneel 模式套 AES 风格 512 位分组密码，8x8 字节状态 10 轮。S 盒按规范用 4 位 mini-box 生成，载入时跑官方向量自检。 |
| xxhash | xxHash 极速哈希 | xxHash32 / xxHash64（Yann Collet）：非加密极速哈希，4 条 lane 并行 striping + 乘旋异或混合。常见于 LZ4/Zstd 校验、数据库索引、文件去重。可选种子（十进制或 0x 十六进制）。载入时跑官方向量自检。 |
| yescrypt | yescrypt 密钥派生 | yescrypt 内存硬口令 KDF（Solar Designer，openwall 官方参考实现）：flags=0 输出与经典 scrypt 完全一致；WORM=最小偏差；RW 默认=prehash + 12KB S-box pwxform + wrap 随机访问 + SCRAM 尾处理。抗 GPU/ASIC。参数 N（2 的幂）/r/p/t/dkLen。 |

### 进制 / 字符集（78 ops）

| opId | 名称 | 说明 |
|---|---|---|
| babylonianNumerals | 巴比伦数字 | 非负整数 ↔ 巴比伦 60 进制楔形数字（竖楔=1 横楔=10，位间空格，最高位在左）；unicode 档用 dCode 14 字形表（𒐕..𒐐，位内先十后个），ascii 档用 \| 与 <（dCode 记法）；无零——文本以 0 占位（工具约定），前导零报错 |
| bech32 | Bech32 编码 | BIP173 Bech32 编码（HRP + payload + BCH 校验和，比特币地址用），hex payload ↔ bech32 地址 |
| bigCalc | 大数计算器（BigInt） | BigInt 大整数运算：四则/截断余/整数幂/模幂/模逆/gcd·extgcd·lcm/素性检验/邻素数/素因子分解（试除+Pollard rho Brent）/整数开方/位长。div 为截断除、mod 符号随被除数（同 BigInt 语义） |
| bitReverse | 位反转 | 每字节 8 位镜像翻转（bit 0↔7, 1↔6...）。encode: 文本→Hex；decode: Hex→文本。自逆变换。 |
| bitRotate | 位循环移位 | 字节内循环移位 1-7 位。encode 按所选方向移；decode 反向移还原。文本↔Hex。 |
| byteSwap | 字节序反转 | 按 2/4/8 字节分组反转字节顺序（大小端转换，自逆）。文本模式: 文本↔Hex；Hex 模式: Hex↔Hex（大小端互转，长度须为组的整数倍）。 |
| bitPlaneExtract | 位平面提取 | 抽取每字节指定位组成比特串（k=0 LSB .. 7 MSB）。有损单向。默认输出全部 8 个位平面。 |
| byteReverse | 整串字节倒序 | 整个字节流首尾倒序（File-Reverse，区别于 byteSwap 定长分组端序反转）。文本模式: 文本→倒序字节 Hex；Hex 模式: Hex↔Hex 整串倒序（自逆）。 |
| uuidParse | UUID 解析 | UUID v1-v8 解析（版本/变体/时间戳/MAC/命名空间说明，RFC 4122） |
| varint | VarInt (LEB128) | Protobuf LEB128 变长整数编解码（无符号 + ZigZag 有符号，BigInt 支持大数） |
| primeGen | 大素数生成 | Miller-Rabin 检验生成指定位数的大素数（确定性版本，crypto CSPRNG）（素性检验用 primeTest，四则/分解用 bigCalc） |
| primeTest | 素性检验（Miller-Rabin） | 判定大整数是否素数并给出位长与轮数说明：n < 3.3e24 用 13 个固定质数 witness 确定性判定（FIPS 186-4 Table C.2），更大 n 按轮数（FIPS 186-5 App. B，随机基误判 < 4^-rounds） |
| luhn | Luhn 校验位 | Luhn 校验（信用卡/IMEI，ISO/IEC 7812）。encode=算校验位，decode=校验合法性 |
| isbn | ISBN-10/13 校验位 | ISBN-10（模 11，校验位可能 X）/ ISBN-13（模 10）校验。encode=算校验位，decode=校验 |
| ean13 | EAN-13 校验位 | EAN-13 条码校验（模 10，奇位×1 偶位×3）。encode=算校验位，decode=校验 |
| cnidCheck | 身份证 18 位校验位 | 中国身份证 18 位校验位（GB 11643-1999，校验位可能 X）。encode=算校验位，decode=校验 |
| upc | UPC-A 校验位 | UPC-A 条码校验（模 10，奇位×3 偶位×1）。encode=算校验位，decode=校验 |
| bankBin | 银行卡 BIN 识别 | 银行卡前 6 位 BIN 识别（卡组织 + 发卡行，单向） |
| color | 颜色编码互转 | RGB ↔ HSL ↔ HSV ↔ CMYK ↔ Hex ↔ 整数色值 ↔ CSS 颜色名（W3C 标准 147 命名色）多向互转。encode=from→to，decode=to→from |
| colorInfo | 颜色全息信息 | 输入任意格式颜色，输出 RGB/Hex/HSL/HSV/CMYK/整数/CSS 命名色 + 最近命名色 + 24 位二进制 |
| egyptianNumerals | 埃及数字 | 非负整数 ↔ 埃及圣书体加法数字（7 符号各为 10 的幂：𓏺=1 𓎆=10 𓍢=100 𓆼=1000 𓂭=10000 𓆐=100000 𓁨=1000000，按次数重复；无零，0 报错）；编码降幂规范形，解码任意顺序求和；紧凑组合字形档与分数省略（无逐条权威来源） |
| unixPerms | UNIX 文件权限 | 权限形态互转报告：755 / 4755 八进制 ↔ rwxr-xr-x / rwsr-xr-t 符号形 ↔ 二进制位 ↔ chmod 命令，含 setuid/setgid/sticky 特殊位与各身份明细 |
| geoDms | 度分秒 ↔ 十进制 | DMS（度°分′秒″H，H=N/S/E/W）↔ DD（十进制度）。秒可带小数。 |
| geoHash | Geohash 编码 | geohash.org 算法。base32 表去 a/i/l/o，纬经度交替二分。CTF 地理坐标高频。 |
| geoPlusCode | Plus Code / OLC | Google Open Location Code（OLC）。字母表 23456789CFGHJMPQRVWX。码长为显著位数（不含 +）：2/4/6/8/10 成对编码，11~15 追加 4×5 网格细分；<8 用 0 填充。默认 10 位（11 字符含 +）。 |
| geoMaidenhead | Maidenhead 网格 | 业余无线电网格定位。field(20°/10°)+square(2°/1°)+subsquare(5'/2.5')，可扩展。CTF Ham 常见。 |
| geoUtm | UTM 坐标 | WGS84 椭球 + Snyder USGS 公式。60 区 6°宽，字母带 C-X（跳 I/O）。输出 Zone+字母带+东距+北距（如 31U 448251 5411937）。 |
| hammingCode | 海明码 Hamming Code | 单纠错海明码 (n,k)：编码插校验位，解码纠 1 位错（默认 k=4 即 (7,4)） |
| iban | IBAN 校验位（mod-97） | ISO 13616 IBAN 校验：国家长度表（89 国）+ 移位 mod-97。encode=国家代码+BBAN 生成完整 IBAN，decode=校验合法性 |
| mayaNumerals | 玛雅数字 | 非负整数 ↔ 玛雅 vigesimal 点横数字（点=1 条=5 贝壳=0，位值×20）；unicode 档用 Unicode 玛雅数字块 U+1D2E0..U+1D2F3 一字一位，dotbar 档用 . 和 -（零层写 0，工具约定）；longcount 档第三位起按 18×20=360 长纪历（uinal≤17） |
| ipv4Int | IPv4 ↔ 整数 | IPv4 点分十进制 ↔ 32 位整数（支持 0x/八进制/0b 变体，inet_aton 语义） |
| ipv6Format | IPv6 压缩/展开 | IPv6 规范压缩（RFC 5952）↔ 全展开 8 组 4 位十六进制 |
| macFormat | MAC 地址格式互转 | MAC 冒号/连字符/点分/整数互转（48 位，自动识别输入格式） |
| cidrCalc | CIDR 子网计算 | 网络/广播地址、掩码、反掩码、主机范围、IP 类与私有段判定（单向） |
| userAgentParse | User-Agent 解析 | 解析 UA 字符串：浏览器/引擎/操作系统/设备类型（单向） |
| objectIdTime | ObjectID 时间戳解析 | BSON ObjectId（12 字节：4 字节大端 Unix 秒 + 5 字节随机值 + 3 字节大端计数器）解析：24 位十六进制 → 生成时间(UTC) + 随机值 + 计数器（run 单向报告） |
| pipNumerals | 点数记数（骰面 / 骨牌） | 十进制数字串 ↔ 点数(pips)符号：dice 档 1–6 ↔ ⚀⚁⚂⚃⚄⚅(U+2680–2685)，domino 档数字对 0–6 ↔ 横/竖骨牌(U+1F031–61/1F063–93)；非法值(0/7–9、奇数长度、背面、异朝向)显式报错，空白透传 |
| primeInspector | 素数判定与筛选 | 对大整数输出 8 档判定依据报告（梅森 Lucas-Lehmer/孪生/索菲·热尔曼/安全/费马/2^(2^e)−1 形「P素数」/强素数/p±1 B-光滑），或按区间·位数+条件勾选筛选素数（梅森/费马走特形枚举；限时+上限，可取消） |
| progCalc | 程序员计算器 | 位运算表达式求值（手写递归下降解析器，无 eval）：& \| ^ ~ << >> >>> + - * / % **、括号、rotl/rotr 循环移位；8/16/32/64 位字宽掩码回绕（全程 BigInt），有/无符号切换；一次输出十进制/十六进制/八进制/二进制（4 位分组）/补码/popcount/前导零/尾随零。 |
| radixConvert | 进制互转 | 任意进制 2-36 互转（BigInt 防溢出） |
| asciiRadix | 字符↔进制ASCII | 字符↔各进制 ASCII（UTF-8 字节序列，定宽空格分隔；二进制支持 7/8 位、0-1 取反、位反转） |
| ieee754 | IEEE754 浮点 | 浮点↔十六进制（半/单/双精度） |
| bcd | BCD 码 | 十进制数字串↔BCD 十六进制串 |
| binPad | 二进制补零对齐 | 十进制数字→指定位宽二进制串（补零） |
| radixAll | 一键多进制转换 | 单输入自动嗅探（0x/0b/0o 前缀 / 十进制 / 分隔符），一次列出 2/8/10/16/32/36/62 进制对照 + Base64 + 数值字节 + UTF-16 码元 + Unicode 码位 + 该码位 UTF-8 + 位宽；负数给 8/16/32/64 位补码；全 01 串歧义时并列多种解读。BigInt 大数无精度损失。 |
| hybridCode | 混合进制解码 | 前缀 b/x/o/d 分别按 2/16/8/10 进制解析字符 |
| separationAscii | 数字串分割 ASCII | 长数字串贪婪分割成可打印 ASCII（10/16/8/2 进制尝试） |
| asciiOffset | ASCII 偏移 | 每个字符 ASCII 码加偏移（offset=0 穷举 -26..26） |
| decimalToFloat | 十进制转任意进制浮点 | 十进制数转 2/8/10/16 进制浮点表示 |
| binaryComplement | 原码反码补码 | 十进制数→原码/反码/补码（8/16/32 位自适应） |
| completion | 补零对齐 | 多段二进制串补零到等长（bits=0 按最长，8/16 定宽） |
| splitHex | Hex N 位分割 | 长 hex 串按 2/4/8 位分割 |
| standardCode | 字符集互转 | 文本→多字符集 hex 编码 / hex→多字符集解码（utf-8/utf-16/gbk/big5 等） |
| timestamp | 时间戳 ↔ 时间 | 时间戳↔时间互转（auto 自动判断，秒/毫秒自适应） |
| gcd | 最大公约数 | 多个数的 GCD 和 LCM |
| primeFactor | 素数分解 | 质因数分解（BigInt） |
| fibonacci | 斐波那契解码 | 把文本中的大斐波那契数（fib[32+]）替换为对应字符 |
| negabase | 负进制 | 十进制 ↔ 负进制（base=-2/-10 等，可逆，BigInt） |
| balancedTernary | 平衡三进制 | 三态 T/0/1（T=-1）↔ 十进制整数（可逆） |
| factorialBase | 阶乘进制 | n = Σ d_i·i!（0 ≤ d_i ≤ i，冒号分隔，可逆） |
| zeckendorf | Zeckendorf 表示 | 正整数 ↔ 不连续斐波那契求和的 01 串（可逆） |
| roman | 罗马数字 | 阿拉伯数字(1-3999) ↔ 罗马数字（可逆） |
| chineseNum | 中文数字 | 阿拉伯 ↔ 中文数字（零一二三…，可逆，含负数） |
| continuedFraction | 连分数 | 有理数 p/q ↔ 连分数序列 [a0; a1, ...]（可逆） |
| sternBrocot | Stern-Brocot 路径 | 正分数 ↔ L/R 路径串（可逆） |
| collatz | Collatz 序列 | 正整数 → Collatz 猜想序列（3n+1，run 单向） |
| randomSeed | 随机种子生成 | crypto CSPRNG 生成随机字节（hex/base64） |
| unixTime | Unix 时间戳 ↔ ISO8601 | Unix 时间戳（秒/毫秒/微秒 auto，有符号，允许契约内负值）↔ ISO8601（UTC） |
| filetime | Windows FILETIME ↔ ISO8601 | FILETIME（1601 纪元 100ns，64 位无符号）↔ ISO8601；拒绝负值、越界、早于 1601 |
| hfsTime | Mac HFS+ 时间 ↔ ISO8601 | HFS+（1904 纪元 秒，32 位无符号，上限 2040-02-06）↔ ISO8601；拒绝负值、越界、早于 1904 |
| cocoaTime | Cocoa 时间 ↔ ISO8601 | Cocoa（2001 纪元 秒，有符号，允许契约内负值）↔ ISO8601 |
| dosDateTime | DOS 日期时间 ↔ ISO8601 | DOS FAT 4 字节打包日期时间（1980+）↔ ISO8601 |
| chineseDate | 汉字日期 ↔ ISO8601 | 汉字日期（二〇〇〇年一月一日）↔ ISO8601（仅日期，UTC 午夜） |
| tzConvert | 时区转换 | ISO8601 时区转换（支持 UTC / ±HH:MM 偏移） |
| julianDate | 儒略日 ↔ ISO8601 | 儒略日（JD，公元前 4713-01-01 12:00 UT 起日数含小数）↔ ISO8601。J2000.0 = 2451545.0 |
| excelDate | Excel 序列日期 ↔ ISO8601 | Excel 序列日期 ↔ ISO8601（1900 系统默认，含 1900 闰年 bug 注记；可选 1904 Mac 系统） |
| chromeTime | Chrome 时间 ↔ ISO8601 | Google/Chrome 时间（1601-01-01 纪元 微秒，BigInt）↔ ISO8601。与 FILETIME(100ns) 单位不同 |
| snowflakeId | 雪花 ID 解析 | Twitter/Discord 雪花 ID 解析（64 位拆 timestamp+数据中心+工作节点+序列号，run 单向报告） |

### 分析 / 爆破（46 ops）

| opId | 名称 | 说明 |
|---|---|---|
| xorBrute | XOR 单字节爆破 | 对输入逐字节异或 0-255，输出全部结果（可过滤可打印） |
| freqDist | 字符频率分布 | 统计字符出现次数和占比（按次数降序，可选大小写过滤/归并 + 升序） |
| entropy | 香农熵 | 计算香农熵（bits/char，判数据随机性，随机字节≈8.0，英语≈4.0-4.5） |
| wordFreq | 词频统计 | 分词统计词频（按次数降序） |
| hammingDistance | 汉明距离 | 两段文本的字节级汉明距离（破 XOR key 长，用换行分隔两段） |
| levenshtein | 编辑距离 | Levenshtein 编辑距离（插入/删除/替换，DP） |
| strContrast | 等长 ASCII 对比 | 逐字符对比两段文本的 ASCII 差值 |
| debruijn | De Bruijn 序列 | 生成 De Bruijn 序列（pwn 缓冲区溢出偏移定位，输入地址查偏移） |
| textIntConverter | 文本↔大整数 | 文本 ↔ 大整数互转（RSA 题，文本按字节拼成大整数或反向还原） |
| extractHashes | 提取哈希串 | 正则提取文本中的 hex 哈希串（32-128 位） |
| getAllCasings | 大小写全排列 | 生成所有大小写组合（字母 ≤20，防爆） |
| alternatingCaps | 交替大小写 | 交替大小写转换（如 sPoNgEbOb 文本） |
| md5CollisionShow | MD5 截断碰撞演示 | 教学演示：截断 MD5（默认 32 位）生日法找碰撞对（不同输入同截断哈希），展示哈希碰撞本质 |
| crc32Reverse | CRC32 反向碰撞 | 表驱动 CRC32 反向求解：给定目标 CRC32 直接反推 4 字节补丁（O(1) 查表不穷举），可加可打印字符前缀搜索得到可读碰撞串。CTF 伪造文件 CRC / ZIP 伪加密用 |
| vigenereAuto | 维吉尼亚全自动破解 | IC 估密钥长度 + 列卡方恢复密钥 + 自动解密（英语统计） |
| hillKnownPlain | Hill 已知明文攻击 | 已知明文+密文还原 Hill 密钥矩阵（C·P⁻¹ mod 26，须可逆） |
| playfairCrack | Playfair 爬山破解 | 模拟退火 + 四元组适应度爬山恢复 Playfair 方阵与明文（长密文更稳） |
| freqAnalysis | 频率分析（n-gram） | 单字母/双字母/三字母频率统计 + 出图数据（ASCII 条形图 + JSON 数据） |
| icAnalysis | 重合指数 IC（含分组） | 整体 IC + 分组 IC（判单表/多表替换 + Vigenère key 长估计，英语≈0.0667，随机≈0.0385） |
| kasiskiTest | Kasiski 检验 | 重复 n-gram 间隔 GCD → Vigenère 密钥长度候选 |
| chiSquareAnalysis | 卡方检验（详细） | 密文 vs 英语字母频率的卡方检验（字母级观测/期望对比表） |
| subCipherSolver | 单表替换自动求解 | N-gram 适应度爬山（迭代局部搜索）自动破解单表替换密码，可锁定已知映射加速 |
| caesarBrute | 凯撒/ROT 自动求位移 | 对 0-25 位移逐一打分（卡方 + 四元组），自动找最佳位移并输出排名 + ROT47 |
| ecCurveIdent | 椭圆曲线参数识别 | 识别 secp256k1/P-256/Curve25519 等曲线（输入曲线名 / 点分 OID / DER OID，输出域参数 p,a,b,G,n,h） |
| dictGen | 字典生成 | 字符集笛卡尔积 / 掩码（@小写 !大写 #数字 $符号）生成字典，上限 100 万条 |
| flagExtract | flag 自动提取器 | 递归多编码解码 + flag{} 正则闭环：白名单 26 个常用 decode op 递归跑，命中即输出 flag + 解码链路（maxDepth 默认 3） |
| formatSniff | 格式嗅探 | 识别输入的格式/特征（JWT/URL/PEM/哈希/编码/密钥/坐标/时间戳等），给 CTF 惊喜提示 |
| geffeGenerate | Geffe 生成器 | Geffe 组合生成器（Geffe 1973）：3 个 LFSR + 非线性组合函数 f=x1x2⊕x2x3⊕x3 输出 keystream。已知 3 LFSR 抽头+初态+输出长度 → keystream（自验/构造测试用；可接「Geffe 相关攻击」验证还原初态） |
| geffeAttack | Geffe 相关攻击 | Geffe 生成器相关攻击（Siegenthaler 1984）：f 与 x1/x3 相关性 P=3/4>1/2，穷举 2^L 初态按匹配率恢复 L1/L3（正确 ≈0.75，错误 ≈0.5）；LFSR2 P=0.5 无相关性，可选 bruteL2 穷举+L1/L3 验证。输入 keystream + 3 LFSR 抽头 |
| hashTypeIdentify | 哈希类型识别 | 按长度+字符集+前缀识别哈希算法（MD5/SHA1/SHA256/NTLM/bcrypt/MySQL/crypt/Argon2/LDAP 等） |
| babaiCvp | Babai 最近平面（CVP） | LLL 归约 + Babai 最近平面：格上最近向量问题 CVP 的近似求解（「格基向量」框每行一个基向量，「目标向量」框填目标） |
| hnpRecover | HNP 隐藏数问题 | ECDSA 弱 nonce 攻击：m 个签名 nonce k_i = t_i + x（x 共享小未知量）时穷举 x 恢复私钥 d（输入：每行 h r s t） |
| randu | RANDU 弱 LCG | RANDU（x=65539·x mod 2^31）教学演示：生成序列 + 周期性说明，经典三维空间 15 平面弱随机数 |
| truncLcgRecover | 截断 LCG 种子恢复 | mod 2^32 截断 LCG（x=a·x+c）：已知连续输出高位（k 位）穷举低未知位恢复种子（未知 ≤24 位） |
| lfsrRecover | LFSR 序列恢复 | Berlekamp-Massey 求二元序列最短 LFSR：线性复杂度 L + 反馈多项式 + 抽头 + 初始状态，可外推预测后续比特。输入一串 0/1（容忍空格/换行/逗号分隔） |
| nonogram | 数织 / Nonogram 求解 | 给行/列连续块约束求解 0/1 点阵（图案常是二维码/字符/flag）。线求解器迭代收敛，两段输入用 --- 分隔，上限 40×40 |
| pcapRepair | pcap 文件修复 | 诊断+修复损坏 pcap：非法/缺失 magic 按 record 链反推重写、全局头整体缺失时前插标准头、字节序标记与内容不符时翻转、snaplen/version 异常修正、incl_len 越界截断。输出修复后 hex 可喂 pcapParse |
| rc4Visualize | RC4 KSA/PRGA 可视化 | 逐步展示 RC4 内部：KSA 打乱 S 表的 i/j/swap 明细 + 最终 S 表 + PRGA 密钥流生成过程，教学/逆向识别 KSA/PRGA 特征 |
| shaLengthExtend | SHA 长度扩展 | SHA-1/SHA-256 长度扩展攻击：已知 (hash, 原消息长度) 伪造追加内容后的哈希（MD5 版见 hashLengthExtension） |
| birthdayCollision | 生日碰撞演示 | 截断 SHA-256 的生日碰撞（bitLen 位，期望 2^(b/2) 次）：教学演示哈希碰撞的本质 |
| spiralMatrix | 螺旋矩阵读取 | 网格字符按螺旋顺序 ↔ 文本：顺/逆时针、左上起、逐圈内收。解码=读矩阵，编码=按螺旋填矩阵。单行输入可指定列数切块 |
| spnAnalysis | SPN 差分/线性分析 | 教学工具：4-bit S 盒的差分分布表（DDT）与线性逼近表（LAT）+ 最强差分/线性特征（默认 PRESENT S 盒） |
| sstiKeyword | SSTI 关键字识别 | 服务端模板注入（SSTI）静态特征扫描：识别 Jinja2/Twig/FreeMarker/Velocity/Smarty 等引擎的模板定界符、经典 RCE 利用链关键字与 7*7 探测 payload，给出引擎推断。只识别不执行 |
| xorAnalyze | xortool 一体化（重复密钥 XOR 分析） | 汉明距离猜 key 长度 + 卡方打分逐字节恢复 key + bigram 组合择优 + 解密结果：纯前端 xortool，keylen 1-64 可配 |
| xorCribDrag | XOR crib-drag 已知明文拖动 | 已知明文片段拖动异或：逐位置 C XOR crib 输出候选密钥/明文 + 可打印率 |
| xorshiftRecover | xorshift 状态恢复 | Marsaglia xorshift32/64/128 PRNG：喂入连续输出，恢复内部状态（单寄存器版反推初始种子）并预测后续输出。32/64 需 1 个输出，128 需 4 个连续输出。CTF 高频。 |

### 密码攻击（21 ops）

| opId | 名称 | 说明 |
|---|---|---|
| ecdsaReuseK | ECDSA nonce 重用攻击 | ECDSA nonce(k) 重用攻击（CTF 经典）：同私钥同 k 签两条消息（共享 r）→ 由 (r,s1,s2,z1,z2,n) 纯数论恢复 k 与私钥 d。k=(z1-z2)/(s1-s2) mod n, d=(s1·k-z1)/r mod n。内置 secp256k1/P-256，填公钥 Qx/Qy 可自动校验并消除 s 符号歧义。 |
| hashDictCrack | 哈希字典爆破（小字典演示） | MD5/SHA1/SHA256/NTLM 弱口令小字典演示：内置约 300 条 top 弱口令 + 纯数字 + 日期，秒级验证常见口令。本工具不做大规模爆破——正式字典/掩码爆破请用 hashcat（https://hashcat.net）或 John the Ripper（https://www.openwall.com/john），在线反查可用 CrackStation（https://crackstation.net） |
| rainbowQuery | 彩虹表查询（本地演示小表） | 本地内置约 300 条弱口令的演示小表（MD5/NTLM 预建 O(1)，SHA 系实时查），验证常见弱口令一查即中。真彩虹表请用公开彩虹表站点 CrackStation（https://crackstation.net）或离线工具 rcracki-mt 配公开表（https://github.com/iphelix/rcracki-mt），本工具不内置也不下载任何彩虹表数据 |
| hmacKeyBrute | HMAC 密钥爆破（小字典演示） | 给定消息 + HMAC 值，用内置小字典（top 口令 + 纯数字）演示 HMAC-SHA1/256/384/512 密钥穷举。本工具不做大规模爆破——大字典请用 hashcat（https://hashcat.net）或 John the Ripper（https://www.openwall.com/john）的 HMAC 格式 |
| hashLengthExtension | 哈希长度扩展攻击（MD5/SHA1/SHA256） | Merkle-Damgård 弱点：从 H(secret) 和 len(secret) 构造 H(secret\|\|padding\|\|append) 而不知 secret。MD5/SHA-1/SHA-256 全部纯 JS 落地（内部 state 反推 + 续压），无需 hashpump |
| pbeAesBrute | PBE-AES 口令爆破（小字典演示） | PBKDF2+AES 弱口令小字典演示：input=密文(hex/base64)，逐口令 PBKDF2 派生 key 解 AES，crib 命中或高可打印率即报，覆盖 openssl enc -pbkdf2 密文。本工具不做大规模爆破——正式爆破请把密文喂给 John the Ripper / hashcat 的 PBKDF2 格式（https://www.openwall.com/john、https://hashcat.net） |
| lllAttack | 格基归约 LLL 攻击 | LLL（Lenstra–Lenstra–Lovász）格基归约，精确 BigInt 有理数 GSO（δ=3/4 标准，可选 0.99）。应用A：背包低密度攻击（CJLOSS 构造，由公钥 β+密文恢复 0/1 明文，配 Merkle-Hellman）；应用B：通用整数矩阵归约求短向量。 |
| prngAttack | PRNG 破解（LCG / MT19937） | LCG 参数恢复（差分法推 a/c/m，可填已知模数）+ MT19937 状态恢复（624 输出 untemper + 预测下一值，Python random 标准） |
| rsaSmallE | RSA 小 e 攻击（整数开根） | e 很小时对密文 c 开 e 次整数根恢复 m（含 c+k·n 试探应对 m^e 略大于 n） |
| rsaCommonModulus | RSA 共模攻击 | 同一 n 同一明文 m，不同互质 e1/e2 加密 → 扩展欧几里得恢复 m（参数框填 c1 和 c2，十进制；主输入框不再使用） |
| rsaWiener | RSA Wiener 攻击（连分数） | 连分数展开 e/n 找收敛子，恢复小 d 密钥（适用 d < n^(1/4)/3；参数框填 e 和 n，十进制；主输入框不再使用） |
| rsaFermat | 费马分解（p,q 相近） | n = a²-b² = (a-b)(a+b)，从 ceil(√n) 递增 a 找 b²（适用 \|p-q\| 较小；输入框填 n） |
| rsaPollard | Pollard rho 分解 | Floyd 环检测 + gcd 分解半素数 n（适合含较小因子；输入框填 n） |
| rsaBatchGcd | RSA 公共因子分解（批量 GCD） | 多个 RSA 模数 N 两两求 GCD，找公共素因子分解 |
| rsaHastad | RSA Hastad 广播攻击 | 同一明文用相同 e 和多个互质 n 加密，CRT 合并后开 e 次根恢复明文 |
| rsaPollardPm1 | RSA Pollard p-1 分解 | Pollard p-1 算法分解 RSA 模数 N（适用 p-1 B-光滑；输入框填 N，每行一个或逗号分隔） |
| rsaDpDqLeak | RSA dp/dq 泄露求 d | 已知 e, n, dp(=d mod p-1) → 分解 n 求 d；可选 dq 验证（参数框填 e/n/dp，十进制，dq 可选；主输入框不再使用） |
| rsaLsbOracle | RSA LSB Oracle 攻击 | LSB Oracle 逐位二分恢复明文。两种用法：①oracleLog 粘贴逐轮 oracle 响应（0/1，每行一轮，共 n 位长轮数）按标准二分恢复 m；②填 m 进入本地模拟验证。参数框填 n/e/c（十进制） |
| rsaBleichenbacher | RSA Bleichenbacher 攻击 | PKCS#1 v1.5 padding oracle 区间归约攻击（真实现）：serverKey 填 oracle 侧私钥（hex：d，或 p,q 逗号分隔）本地模拟判定，标准 Bleichenbacher 循环解出 m；maxS 护栏默认 100 万次查询，每 5000 次输出进度 |
| rsaCoppersmith | RSA Coppersmith 小根攻击 | stereotyped message 小根恢复（真实现：Howgrave-Graham 构格 + BigInt LLL）：已知明文前缀或后缀 + 未知字节数，构造 f(x)=(已知±x)^e−c mod n 求小根恢复完整明文；beta<1 支持根在 n 的因子上（命中给因子） |
| rsaBonehDurfee | RSA Boneh-Durfee 提示 | d < N^0.292 条件检查 + 格攻击方法说明（参数框填 n/e，十进制；主输入框不再使用） |

### 压缩 / 归档（16 ops）

| opId | 名称 | 说明 |
|---|---|---|
| gzipCodec | Gzip 解压 / 压缩 | gzip 流双向（浏览器 DecompressionStream；输入 hex/base64/UTF-8 自动识别） |
| zlibCodec | Zlib 解压 / 压缩 | zlib 流（含 2 字节头 + adler32 尾）双向；浏览器实测 |
| deflateRawCodec | Raw Deflate 解压 / 压缩 | raw deflate（无 zlib 头）双向；浏览器实测 |
| b64CompressedProbe | Base64 内嵌压缩流探测 | 扫文本中 base64 段 → 解码 → magic 识别 → 尝试 gzip/zlib/deflate 解压 |
| zipRepair | ZIP 伪加密修复 | 清除中央目录与本地文件头通用位标志的加密位（bit0，可连带强加密位 bit6）。走 EOCD→中央目录→本地头精确路径，不误伤压缩数据。伪加密=标志位被置 1 但数据未加密，清位即可正常解压；输出修复后 base64 |
| zipPseudoEncrypt | ZIP 伪加密（置位） | 把中央目录与本地文件头的加密位（bit0）置 1 而不动数据——制造「需要密码」假象，「ZIP 伪加密修复」的逆操作，可用于出题与演示；输出置位后 base64 |
| sevenZipExtract | 7z 归档解析 / 解压 | 识别 7z 签名 + 解析 SignatureHeader/StartHeader（CRC 校验）；放置 public/wasm/7zz.js 后可真列表/解压（LZMA 等，wasm 缺失自动降级） |
| archiveUnified | 压缩 / 归档归一分析 | 自动识别 gzip/zlib/bzip2/zip/rar/7z/tar → 列结构 → 能解则解（gzip/zlib 纯 JS；zip 含伪加密检测；7z 走 wasm 降级） |
| rle | RLE 行程编码 | 游程编码：计前式 4A3B=AAAABB / 计后式 A4B3 / 打包式 count+value 字节对(hex)；变长或定长计数，双向 |
| lzw | 标准 LZW（GIF/TIFF） | 经典变长码本 LZW 三档——GIF 档：LSB-first 位流、初始 256 项字节字典、clear 256 / EOD 257、9→12 位变宽；TIFF 档：MSB-first 位流 + early change（码长在码本 511/1023/2047 项时切换）、clear 256 / EOI 257、首新码 258、码本满先发 clear，条带末尾无 EOI 也容忍，输出为字节流（合法 UTF-8 给文本，否则给完整 hex）；定长档：MSB-first 定长 N 位，hex 呈现。≠ 既有 LZString op（JS 库变体，不等价） |
| elias | Elias Gamma/Delta 编码 | universal 前缀码：gamma = ⌊log₂x⌋ 个 0 + 二进制原码；delta = gamma(⌊log₂x⌋+1) + 尾段。正整数 ↔ 位串双向 |
| lz4Dec | LZ4 解压 | 块格式（token 高 4 位字面量/低 4 位匹配 + 255 续位 + 2 字节小端偏移）与帧格式（magic 0x184D2204、xxh32 头/块/内容校验）解压；支持帧外部字典（Dict-ID + 「外部字典」参数），hex/base64 输入自动识别 |
| bzip2Dec | bzip2 解压 | 完整解压链：BZh 头 + π/√2 magic + Huffman(MTF+RUNA/RUNB) + BWT 逆变换 + RLE1 尾游程 + 块/文件 CRC 校验；含 0.9.0 时代已废弃的 randomized 档（按参考实现 BZ2_rNums 表逐字节反随机化）；纯 JS 自研，hex/base64 输入自动识别 |
| lzstring | LZString 压缩 (LZW) | 标准 LZW 压缩（参考 pieroxy/lz-string 算法思路）。encode 压缩为 JSON 数字数组；decode 解压还原。仅支持 Latin-1 字符（0-255），中文等多字节字符请先 UTF-8 编码。LZ4 跳过（块格式对齐成本高）。 |
| lznt1 | LZNT1 解压 | Windows LZNT1（RtlCompressBuffer / NTFS 压缩）LZ77 流解压：位标志 chunk + 反向引用（offset/length 位分割随块内位置变化）。仅解压单向；过本机 Windows 真样本 12 例 + 独立 Python 参考对拍 |
| zipCreate | ZIP 创建（出题） | 把一段数据（文本/任意字节）打包成单文件 ZIP，可选内部文件名与压缩方式（Deflated/Stored）；出 misc 题常接 ZIP 伪加密（置位）做伪加密题 |

### 口令 / 归档破解（10 ops）

| opId | 名称 | 说明 |
|---|---|---|
| bkcrackAttack | ZipCrypto 已知明文攻击 (bkcrack) | ZIP 传统 ZipCrypto 加密的杀手锏（开源工具 bkcrack 的本地 WASM 封装，代码来源 kimci86/bkcrack，https://github.com/kimci86/bkcrack）：给出某条目 ≥12 字节连续已知明文，恢复内部密钥态并解密全档，无视密码长度（非 AES）。四种模式：明文攻击求密钥 / 攻击+解密 / 已知密钥态解密（-k）/ 已知密钥态暴力恢复密码（-k -r）。放置 public/wasm/bkcrack.js 后启用，wasm 缺失自动降级。⚠ CPU 密集，数秒~几十分钟、峰值内存 300-500MB。 |
| crc32Collision | CRC32 碰撞爆破 | 对目标 CRC32（标准 IEEE/zip CRC）穷举短明文反查原文。CTF misc 里 ZIP 存小文件、只知 CRC 时用。表驱动增量计算 |
| sevenZip2john | 7z 哈希提取（7z2john） | 从加密 7z 提取 John/hashcat 格式 hash 串（只提取不爆破）。输出 $7z$ 格式（hashcat mode 11600）。支持 AES-256-SHA-256 加密的 7z 文件，提取 salt/IV/iterations/加密数据，输出可直接喂 john/hashcat 离线爆破 |
| office2john | Office 哈希提取（office2john） | 从加密 Office 文档（.doc/.docx/.xls/.xlsx/.ppt/.pptx）提取 John/hashcat 格式 hash 串（只提取不爆破）。解析 CFB/OLE2 容器中的 EncryptionInfo 流，支持 Office 2007($office$*2007*, hashcat 9400)、2010($office$*2010*, hashcat 9500)、2013($office$*2013*, hashcat 9600) |
| pdf2john | PDF 哈希提取（pdf2john） | 从加密 PDF 的 /Encrypt 字典提取 John/hashcat 格式 $pdf$ hash 串（只提取不爆破）。照 openwall john 官方 pdf2john 格式，支持 R2-R6（RC4 / AES-128 / AES-256）。输出可直接喂 john/hashcat 离线爆破 |
| rar2john | RAR 哈希提取（rar2john） | 从 RAR3/RAR5 加密文件提取 hash 串（$RAR3$/$rar5$），输出可直接喂给 john/hashcat。只提取不爆破 |
| sshkey2john | SSH 私钥哈希提取（sshkey2john） | 从 SSH 私钥（OpenSSH 新格式 / PEM 传统 RSA/DSA/EC）提取 John $sshng$ 格式 hash 串（只提取不爆破）。OpenSSH 加密用 bcrypt+AES-256；PEM 用 DEK-Info 指定的 cipher+IV。输出可直接喂 john/hashcat 离线爆破 |
| zip2john | ZIP 哈希提取（zip2john） | 从加密 ZIP 提取 John/hashcat 格式 hash 串（只提取不爆破）。ZipCrypto→$pkzip2$ 格式(hashcat 17200-17230)；WinZip AES→$zip2$ 格式(hashcat 13600)。输出可直接喂 john/hashcat 离线爆破 |
| zipBrute | ZIP 弱口令爆破（小字典快验） | ZIP 弱口令快速验证：ZipCrypto（传统 PKWARE）走 12 字节头快筛+CRC 全量校验；WinZip AES（AE-1/AE-2，method 99）走 PBKDF2-HMAC-SHA1 派生 + pwdVer 快筛 + HMAC-SHA1 确认。内置字典 + 自定义字典 + 纯数字掩码（默认 4 位，硬上限 6 位），仅验证密码不还原明文。本工具不做大规模爆破——更强算力请用本箱「ZIP 哈希提取（zip2john）」取出 hash 串，喂 John the Ripper（https://www.openwall.com/john）或 hashcat（-m 13600 / -m 17200-17230，https://hashcat.net）。输入 ZIP 的 hex/base64/拖入字节 |
| zipCrc32Brute | ZIP CRC32 内容爆破 | ZIP 里 Stored 小文件已知 CRC32 反查内容。对长度 ≤6 的所有可能内容穷举 CRC32，命中即输出。表驱动增量计算 |

### 取证 / 流量（19 ops）

| opId | 名称 | 说明 |
|---|---|---|
| oleExtract | OLE/CFB 容器静态提取 | OLE2/Compound File Binary 只读解析：目录树（storage/stream）、FAT 与 MiniFAT 双通道取流、Root CLSID、流字节 SHA-256 并附下载产物。适用 .doc/.xls/.ppt/.msi/vbaProject.bin。静态只读，绝不执行宏 |
| ftpExtract | FTP 对象提取 | FTP 控制/数据流配对：解析 USER/PASS/PORT/PASV/EPSV/RETR/STOR 命令与应答，按五元组配对数据连接，导出传输文件原字节（SHA-256 对拍）；主动/被动/扩展被动、多会话、ASCII/二进制标注，缺段显式报告 |
| tlsDecrypt | TLS1.2 已知密钥还原 | 配合 NSS keylog（SSLKEYLOGFILE 的 CLIENT_RANDOM 行）离线解密 TLS1.2 + AES-128-GCM 抓包，导出双向明文（GCM 认证全验、SHA-256 对拍）；错会话 keylog 显式拒绝零产物，TLS1.3/CBC/无密钥如实说明不可解 |
| wpaDecrypt | WPA2 握手校验/CCMP 解密 | 离线解析 radiotap/802.11：EAPOL 四次握手判定 + 已知 SSID/口令 PBKDF2→PTK→MIC 校验（口令对错确定性结论）+ CCMP 数据帧认证解密并重建 Ethernet pcap 接回流量链；TKIP/WEP/WPA3 显式拒绝 |
| pcapFieldExtract | pcap 字段提取/过滤 | 逐包提取 ip.id / TTL / TCP urgent pointer / DNS qry-answer 等字段，协议与方向过滤（src:/dst:/port=），输出表格/TSV/纯值三档（values 可直接接 TTL 隐写解码）；附带 TCP 重组乱序/重传/缺段诊断 |
| pcapParse | pcap/pcapng 结构解析 | 解析 pcap/pcapng 流量文件：全局头+包记录+Ethernet/IPv4/IPv6/TCP/UDP/ICMP/HTTP/DNS 分帧，输出包摘要表+协议详情+载荷提取。纯前端零依赖 |
| pcapTcpReassemble | TCP 流重组 | 按 5 元组聚合 TCP 段，seq 排序去重，还原各方向完整字节流（HTTP 提取的基础）。纯前端零依赖，复用 pcapParse 分帧 |
| pcapHttpExtract | HTTP 对象提取 | 基于 TCP 重组解析 HTTP 请求/响应，处理 chunked 传输与 gzip/deflate 解压（纯 JS inflate），导出传输的文件/文本 |
| pcapDnsTunnel | DNS 隧道检测 | 提取 DNS query 子域名数据标签，拼接后尝试 base32/base64/hex 解码，检出 DNS 隧道外泄的隐藏数据。复用 pcapParse DNS 分帧 |
| pcapIcmpPayload | ICMP 载荷提取 | 提取 ICMP echo 载荷，按 id/seq 排序拼接，还原 ICMP 隐写/隧道外泄的数据。复用 pcapParse ICMP 分帧 |
| mcLevelDat | Minecraft level.dat 解析 | 解析 Minecraft Java 版世界存档 level.dat（gzip 压缩的 NBT）：种子/出生点/GameRules/版本/DataVersion，高亮非常规 GameRule 与异常坐标等可疑字段。自写大端序 NBT 解析器，Long 用 BigInt，纯前端零外发 |
| mcMapRender | Minecraft 地图渲染 | 把 Minecraft Java 版地图物品 map_#.dat（gzip NBT，根下 data.colors 为 128×128 调色板索引）渲染成 PNG：内置 62 个 MapColor 基础色 + 4 档明暗，解码 16384 字节为 RGBA，手写最小 PNG 编码器（零 canvas 依赖）提供完整文件下载和缩略预览。CTF 常用地图画二维码/像素画/隐藏文字。支持最近邻放大便于看二维码。复用 mcSave 的 NBT 解析器，纯前端零外发 |
| trailerCarve | 文件附加数据剥离 | 识别载体正体结束偏移（PNG IEND/JPEG FFD9/GIF 3B/ZIP EOCD/BMP/RIFF/PDF %%EOF），剥出尾部附加字节并识别魔数；或 binwalk 式全文扫描内嵌文件 |
| trafficReadable | 流量可读结论 | 把 pcap/pcapng 流量包从一屏十六进制变成人能直接读的结论：USB 键盘还原按键序列并出打字节奏图、USB 鼠标还原轨迹并出真彩轨迹图 PNG、HTTP/DNS/TLS 协议摘要、MQTT 主题表，并自动挑出 flag 与明文线索。定位是新手题一把梭的基础取证（容器概览 / 协议统计 / 关键字段 / 键鼠还原 / flag 扫描）；加密流量解密、DNS/ICMP 隧道文件重建等深度分析不在范围内——TLS 只提取 ClientHello 的 SNI，不解密内容 |
| foremostCarve | 文件雕刻（Foremost JS） | 纯 JS 版 foremost：从混合二进制容器/磁盘镜像/流量 dump 里按头尾魔数雕刻内嵌文件。支持 JPEG/PNG/GIF/ZIP/PDF/WAV/MP3/RAR/7z，头尾配对+长度护栏防误切+截断标注+字节级去重，产物可直接下载 |
| mcNbtView | Minecraft NBT 树查看器 | 浏览器版 NBTExplorer：把任意 Minecraft Java 版 NBT（level.dat / *.dat / playerdata / 结构 .nbt 等，gzip/zlib/裸均可）解压后完整转储为缩进折叠的可读文本树。显示每节点 tag 类型名 / key / 值，List 标元素类型与长度，Long/LongArray 用 BigInt 不丢精度，大数组截断显示。支持路径过滤定位子树。复用 mcSave 的 NBT 解析器，纯前端零外发 |
| mcTextExtract | Minecraft 文本情报提取 | 遍历 Minecraft Java 版存档 region/*.mca（Anvil，chunk 内 zlib NBT）或单个 .dat/.nbt，抽取告示牌 / 成书 / 命令方块 / 实体与方块 CustomName / 物品 Name+Lore，按类型+坐标聚合，并高亮 flag{...} 及常见变体（含 base64 解码再扫）。复用 mcSave 的 NBT 解析器，纯前端零外发 |
| usbKeyboard | USB 键盘流量解析 | 解析 USB 键盘 leftover capture data（8 字节 HID 报告：Modifier+Reserved+Keycodes 1-6），还原按键输入 |
| usbMouse | USB 鼠标流量解析 | 解析 USB 鼠标 leftover capture data（按钮+X/Y 位移，boot 协议 4 字节报告），还原鼠标轨迹 |

### 文件格式 / 结构（11 ops）

| opId | 名称 | 说明 |
|---|---|---|
| adsTool | NTFS ADS 备用数据流 | 检测/提取/删除/添加 ZIP 内嵌的 NTFS 备用数据流（ADS）。Windows 右键压缩会把 ADS 连同 NTFS 扩展字段一起打进 ZIP——「file.txt:secret」类 CTF 题的载体。纯 JS 实现替代原 ntfsstreams GUI exe。注意：浏览器拿不到主机文件系统上文件的真实 ADS，本工具作用于 ZIP 载体。 |
| ooxmlMeta | OOXML 元数据提取 | docx/xlsx/pptx 的元数据一键挖出：docProps 下 core.xml（标题/作者/时间）·app.xml（程序/公司）·custom.xml（自定义属性）全部键值对。ZIP 容器直解（stored/deflate），拼接件前缀自动修正，作者名/公司名/隐藏备注常是取证线索 |
| apkManifest | APK Manifest 解析 | Android 的 AndroidManifest.xml（二进制 AXML 或明文）直接解出：包名 package、权限 uses-permission/uses-permission-sdk-23、四大组件 activity/service/receiver/provider 全列出，附逐元素属性表。AXML 字符串池 UTF-8/UTF-16 双格式，typed 值（字符串/整型/布尔/资源引用/颜色）都还原 |
| htmlCommentExtract | HTML 注释提取 | 提取 HTML 源码里 <!-- --> 注释域（HTML Living Standard 分词语义：第一个 -->/--!> 收口、<!--> 空注释急收、<!-- 不嵌套、EOF 未闭合仍取整段）。嵌套容错模式把 <!-- 按深度计数配对（非标准约定，应对出题人手写嵌套注释）。输出逐条注释+字符偏移+未闭合标记，可选最小长度过滤。取证排查被注释掉的 flag/隐藏表单/调试信息 |
| zipCommentExtract | ZIP 注释提取 | 提取 ZIP 注释域（APPNOTE 6.3.x）：EOCD 档案注释（§4.3.16 偏移 20/22）+ 中央目录每条目注释（§4.3.7 偏移 32）。EOCD→CD 精确路径走查（不扫描压缩数据），支持拼接文件前缀修正（图片/垃圾字节+ZIP），UTF-8/EFS bit11 解码+latin1 回退+hex 原值。CTF 里 flag 藏 ZIP 注释、或注释提示后续步骤的直接取证点。无注释明示、非 ZIP/截断/RAR/ZIP64 中文报错 |
| elfInfo | ELF 可执行信息 | ELF 头信息一览（格式/架构/位数/字节序/类型/入口点），并解出动态链接细节：PT_INTERP 解释器路径、DT_NEEDED 依赖库、是否共享库（ET_DYN≈.so/PIE）。拿到 ELF 先看架构/位数选引擎，再决定是否 PIE |
| scriptDecoder | MS 脚本解码（.vbe/.jse） | 还原 Microsoft 编码脚本（scrdec 算法）：#@~^ 头 + 128×3 替换表按 64 步组合序列位置解码，@& @# @* @! @$ 逃逸还原；.vbe/.jse 取证常客，单向 |
| pycExeDecompile | pyc/exe 反编（本地桥） | 拖入 .pyc 或 PyInstaller 打包 .exe，经本地 bridge.py 自动判 Python 版本并反编为源码（uncompyle6/decompyle3，3.9+ 走 pylingual 实验链路；仅 Windows，需先起 python bridge.py） |
| pdfObjects | PDF 对象解析 | 挖出 PDF 对象表：编号/偏移/长度/Type/Subtype/Filter/流长度逐对象列出，FlateDecode 流自动 zlib 解压并预览（页面内容流/隐藏文本/压缩 flag 藏身处）。词法容错扫描，xref 损坏、前置垃圾拼接、缺 endobj 截断件都能解 |
| peInfo | PE 可执行信息 | Windows PE（.exe/.dll）头信息一览（架构/位数/类型 EXE\|DLL/子系统/入口 RVA/镜像基址）。拿到 PE 先看架构/位数选引擎，再判断 EXE 还是 DLL、GUI 还是控制台 |
| stringsExtract | 字符串提取（strings） | 任意字节流里提取连续可打印字符串（经典 strings 工具）：ASCII / UTF-16LE / 双模式合并，最小长度阈值，可选偏移前缀。逆向取证起手动作，图片/文档/内存转储里快速捞 flag、路径、域名 |

### 数据结构 / 序列化（21 ops）

| opId | 名称 | 说明 |
|---|---|---|
| huffmanCodec | 哈夫曼编解码（通用） | 频率档（输入统计/权重表 → 确定性 canonical 码）与用户码表档双向编解码；MSB-first 位流（hex+bitLen 双产物）；拒绝非前缀码/重复码字/截断/未知符号；不定义私有文件格式。权重表支持 \xNN/0xNN 任意字节符号，`#` 开头行为注释 |
| pemParse | PEM/DER 结构解析 | 识别 RSA/EC/Ed25519 公私钥、X.509 证书、CSR（输入 PEM 文本或 DER hex/base64） |
| asn1Parse | ASN.1 TLV 解析 | X.690 DER 递归解析（输入 DER hex 或 base64，输出标签/长度/值树 + OID 名称） |
| sshPubkeyParse | SSH 公钥解析 | 解析 ssh-rsa / ssh-ed25519 / ecdsa-sha2-* 公钥（authorized_keys 格式，拆解 base64 blob 字段 + SHA256 指纹） |
| btcAddressIdent | 比特币地址识别 | 识别 P2PKH / P2SH / P2WPKH / P2WSH / P2TR 地址类型 + 网络主测试 + Base58Check/Bech32 校验 |
| ethAddressIdent | 以太坊地址识别 | 识别 0x 地址并校验 EIP-55 混合大小写（Keccak-256 哈希逐位校验，输出标准校验地址） |
| cryptoAddrUnified | 加密货币地址解析 | 自动识别 BTC(P2PKH/P2SH/P2WPKH/P2WSH/P2TR) / ETH 地址类型 + 校验和验证 + 网络 + 编码方式（归一入口，只解析不生成私钥） |
| diffTool | 差异对比 | 两段输入逐字节 / 逐行 diff，定位差异区间（等长快速路径 + 不等长 LCS 对齐，CTF 找隐藏差异） |
| rison | Rison | 面向 URI 的紧凑 JSON：() 对象、!() 数组、!t/!f/!n、标识符免引号、引号串仅 !' 与 !! 转义、指数禁 +；JSON ↔ Rison 双向，支持 O-Rison / A-Rison / URI 引用变体 |
| hexRange | Hex 区间提取 | 提取指定偏移区间的字节，多格式展示（hex/dec/oct/bin/ASCII/UTF-8） |
| hexStats | 字节分布统计 | 字节值分布（256 桶密度网格/3 桶）+ 可打印率 + 全局/滑窗香农熵（曲线定位加密/压缩区）+ top-N 高频字节 |
| b64urlJson | Base64url ↔ JSON | Base64url 与 JSON 互转 + 美化（不验证签名） |
| pickleDisasm | Pickle 反汇编 | Python pickle 字节码反汇编（协议 0-5，pickletools.dis 风格），高亮 GLOBAL/REDUCE 等危险 opcode 与 os.system 等 RCE 符号 |
| protobufParse | Protobuf Wire 解析 | 无 schema 解析 protobuf wire 格式（varint/64-bit/length-delimited/32-bit，自动尝试嵌套 message 与字符串） |
| msgpackParse | MessagePack 解析 | 解析 MessagePack 二进制（全类型：nil/bool/int/float/str/bin/array/map/ext） |
| cborParse | CBOR 解析 | 解析 CBOR 二进制（RFC 8949，含 major type 0-7、indefinite length、tag、half/float） |
| bsonParse | BSON 文档解析 | 解析 BSON 文档（bsonspec.org：double/string/document/array/binary/ObjectId/bool/datetime/null/int32/int64 等） |
| phpSerializeParse | PHP serialize 解析 | 解析 PHP serialize() 字符串（N/b/i/d/s/a/O/C/r/R 全类型，递归嵌套） |
| javaSerializeIdent | Java 序列化识别 | 识别 Java Object Serialization magic(0xACED) + 扫描顶层 TC_* 标记（TC_STRING/TC_CLASSDESC/TC_BLOCKDATA 等关键信息） |
| stegoDetect | 隐写检测（文本 / 文件） | 统一隐写检测入口，mode 细分 11 种分析：文本侧零宽/不可见字符扫描、同形异义字、Unicode 规范化、空白隐写、双向控制符（Trojan Source）、字符属性透视、不可见字符可视化；文件侧 PNG/JPEG/GIF 结构快速分析、JPEG DCT 卡方检测、PNG/BMP LSB 全组合扫描。只分析不改写载体，纯前端零外发。 |
| unitConv | 单位换算 | 数据量 B/KB/MB/GB/TB/PB 与 KiB/MiB/GiB/TiB/PiB 两制并列（SI 1000 制 vs IEC 60027-2 1024 制，系数全部可溯源）；速率 bps/Kbps/Mbps/Gbps ↔ B/s/KB/s/MB/s（bit×8）；时间 ns~d；纯数字触发时间戳纪元对照（Unix 秒/毫秒、FILETIME、Cocoa、Chrome μs、DOS 打包，数量级自动嗅探）；频率 Hz~GHz；角度 deg/rad/gon。数据量全程 BigInt 有理数，PB 级零精度损失，精确小数与截断位明确标注。 |

### 图像 / 二维码（24 ops）

| opId | 名称 | 说明 |
|---|---|---|
| bin2img | 二进制转图片 | 0/1 位流 → 黑白点阵图（1=黑 0=白，可反色）。CTF 中一串二进制按宽度排布常构成 flag 文字/二维码。输出 PNG，可下载。宽度留空自动取近似正方形。 |
| bmpPalette | BMP 调色板隐写分析 | 解析 1/4/8-bit 索引 BMP 调色板：dump 全部项 + 抽取 LSB/索引顺序/相邻差值隐写候选 + 未用索引统计，命中 flag 高亮 |
| dataToImage | 数值数据渲染成图 | 把「一行一个像素 / 一行一个坐标 / 一行一个数」的数值文本渲染成 PNG：自动判形态（RGB(A) 通道、坐标点集、标量网格、0/1 位流），自动推导宽高（平方根或按行数），可选放大、通道顺序、y 轴方向、点集连线。布局为显式声明，判定依据写进报告，可人工纠正。输出走产物协议直接下载。 |
| pngChunkList | PNG 全块解析 | 列举 PNG 所有 chunk（IHDR/PLTE/tEXt/zTXt/iTXt/bKGD/iCCP/IDAT/IEND 等），解析文本块与元数据 |
| jpegAppList | JPEG APPn 段列举 | 列举 JPEG 所有 APP0-APP15 段及 marker 段（SOF/DQT/DHT/COM 等），标识段内容 |
| gifComment | GIF 注释扩展 | 提取 GIF 89a 注释扩展块（0x21 0xFE），拼接所有 sub-block 文本 |
| gifFrames | GIF 多帧提取 | 逐帧解码合成并压缩为 PNG，单 ZIP 下载；默认全部帧，受4096帧/128MiB ZIP及像素、时间预算约束，失败不交付不完整包 |
| iccStrip | ICC 剥离 | 剥离 ICC profile（PNG iCCP chunk / JPEG APP2 ICC_PROFILE 段），返回去 ICC 后的 base64 |
| gifTiming | GIF 帧时序隐写 | 读每帧图形控制扩展的 Delay Time（厘秒），映射为数字序列 / ASCII / 阈值二值化位流，解出藏在播放时长里的信息 |
| qrGen | QR 码生成 | 纯 JS QR 编码（数字/字母/字节模式 + L/M/Q/H 纠错），输出可扫描二维码 PNG（含静默区）+ 0/1 矩阵 JSON。核心移植自 Nayuki (MIT) |
| barcodeIdentify | 条码类型判定 | 2D（QR/Aztec/DataMatrix 结构识别）+ 1D（EAN/UPC/ISBN/ITF/Code39/Codabar 校验位判定） |
| qrDecode | QR 码解码 | 从 0/1 矩阵反解 QR 内容：finder 检测 + 格式信息 + 之字形取数 + 掩码还原 + RS 纠错 + 数字/字母/字节模式还原。开「诊断」输出版本/ECL/掩码/RS纠错数/分段模式全流程报告 |
| pngSizeRecover | PNG 宽高爆破恢复 | 检测 PNG IHDR CRC 篡改 + 爆破恢复真实宽高（CTF 改高度藏图经典；先只爆高度 O(N) 秒出，再爆宽度，最后双爆兜底；输出修复后 base64） |
| bmpSizeRecover | BMP 宽高修复 | 检测 BMP 宽高与像素数据量不一致 + 反推真实宽高（BMP 无 CRC，用像素字节数整除 rowSize 反推；CTF 改 BMP 宽高藏图；输出修复后 base64） |
| jpgSizeRecover | JPEG 宽高修复 | 基线 JPEG 数 MCU 反推真实高度（SOF 无校验和，熵解码扫描数据数块即得；CTF 改高度藏图的 JPEG 版）+ 手动强制宽高，输出修复后 base64 |
| qrScanImage | 二维码扫描解析 | 二维码一个入口全包：粘贴图片自动扫描，粘贴文本矩阵自动解析。图片（PNG/JPEG/GIF/BMP/WebP）解出内容；0/1 矩阵或 ASCII art 给出版本/纠错级/掩码/finder 体检。定位符被抹掉或遮挡也能解（网格重建 + 穷举 + 擦除纠错）。「读码范围」放开后可一并读出图中的条码（Code128/EAN/UPC/ITF 等）与 DataMatrix/PDF417/Aztec，多枚符号在诊断报告里逐个列出；勾「诊断报告」失败时给出卡在哪一步与建议。全程本地计算。 |
| imageStructUnified | 图像结构分析（归一） | 拖图/粘贴 base64 自动识别 PNG/JPG/GIF/BMP，统一输出文件头/尺寸/块结构/EXIF/XMP/尾部附加数据/宽高异常修复建议。归并 pngChunks/imgMeta/jpegSizeRead/gifSizeRead 四个 op；宽高修复动作仍由 pngSizeRecover/bmpSizeRecover/jpgSizeRecover 单独提供 |
| qrFormatBrute | QR 格式信息爆破 | 格式信息区损坏的 QR 抢救：枚举全部 32 组 (纠错级×掩码) 组合逐组取数去交织 RS 纠错解码，列出全部可解组合与原文（ISO/IEC 18004；能力对齐 QRazyBox） |
| imageBasic | 图像基础操作 | 反色/翻转/通道分离/位平面提取等图像基础变换 |
| pngText | PNG 文本块读写 | PNG tEXt/zTXt/iTXt chunk 解析与写入（操作文件字节，base64 输入输出，不经 canvas） |
| pngHeight | PNG 高度修改 | 修改 PNG IHDR 高度（CTF 隐藏图层经典手法；操作文件字节，base64 输入输出） |
| exifExtract | EXIF 提取 | 解析 JPEG APP1 EXIF 元数据（Make/Model/DateTime/GPS 等；操作文件字节，base64 输入） |
| bitplaneSlicing | 位平面分解 | 提取指定比特位的位平面（color 按 RGB 各通道，gray 按亮度） |
| imageDiff | 图像差异对比 | 双图逐像素运算（XOR/差值/加/与/或），找隐藏层；第二张图从参数栏粘贴 base64/dataURL |

### 音频 / 音视频（6 ops）

| opId | 名称 | 说明 |
|---|---|---|
| dtmfWav | DTMF 拨号音 WAV | 按键序列 ↔ 拨号音 WAV：encode 数字(0-9 A-D * #)→叠加行/列双正弦 16位单声道 WAV(base64)；decode WAV(base64/hex)→Goertzel 检 8 基频→按键。解码支持整数 PCM(8/16/24/32bit)/IEEE float(32/64bit)/µ-law，对标并超越 dtmf2num。 |
| wavHeader | WAV 头解析 | 解析 RIFF/WAVE 结构：遍历 chunk + fmt 块（采样率/位深/声道/格式码）+ data 块时长；输入 hex/base64/UTF-8 自动识别 |
| sstvIdent | SSTV 模式识别 | 检测 1200Hz 起始同步脉冲 + VIS 码，标注可能的 SSTV 模式（Robot/Scottie/Martin/PD）；仅识别不解调图像 |
| morseWav | 摩斯音频编解码 | 摩斯电码音频（WAV）双向（ITU-R M.1677-1）。encode: 明文或点划串 → 按 1/3/7 单位时间格合成 16 位单声道 WAV（base64 + 可下载 morse.wav），音调/采样率/幅度/升降沿可调；decode: WAV 音频 → 包络检测 → Otsu 自适应阈值 → 点划自适应分类 → 明文。解码支持整数 PCM 8/16/24/32 位、IEEE float 32/64 位、µ-law、单/多声道、任意采样率；单位时长自适应估计，可被 unit(ms) 或 wpm(PARIS) 覆盖；输出含点划计数、信噪判据与置信度，并附「明文再解一层」参考（复用一键解码引擎跑一层，不改变原结果）。 |
| pcmTransforms | PCM 波形变换 | WAV 整数 PCM（8/16/24/32bit）五档逐样本变换：声道差 L-R（宽域计算，输出 32bit WAV + 饱和计数）、一阶差分、波形反相、时间倒放（保持原格式重建 WAV）与阈值位流（逐样本 / 分窗取 max，LSB-first 打包 + 游程统计）。IEEE float 与压缩格式显式拒绝。 |
| spectrogram | 音频频谱图（STFT） | WAV → 短时傅里叶变换频谱图 PNG：Hann 窗 + radix-2 FFT，magma 色阶渲染，肉眼读频域藏字（CTF 音频隐写把 flag 画进频谱）。纯前端免装 Audacity |

### 文本隐写（13 ops）

| opId | 名称 | 说明 |
|---|---|---|
| zeroWidth | 零宽字符隐写 | Kei Misawa MIT：载体文本夹带隐藏消息，radix-N 零宽字符。默认 U+200C/200D/202C/FEFF（radix-4），可切换扩展字符集缩短编码 |
| zeroChar | 零宽摩斯密码 | 明文→摩斯→零宽 U+200B(/)U+200C(.)U+200D(-)，CJK 走 \uXXXX |
| zwTags | Unicode Tag 走私 | U+E0000 平面隐藏 ASCII/UTF-8 字节，LLM prompt 注入常用载体 |
| zwVarSel | 变体选择器隐写 | Paul Butler 2024：U+FE00-FE0F / U+E0100-E01EF 附加任意字节流 |
| emojiSubst | emoji 替换隐写 | emoji-aes 替换层：base64 字母表 ↔ 65 emoji 表 + rotation（不含 AES） |
| tadpole | 蝌蚪文 | 蝌蚪文加解密（U+06D6-U+06EC 装饰符 + checksum + b64 双格式） |
| snow | SNOW 空白隐写 | 行尾空白隐写（原版 mattkwan/snow 格式）：TAB 标记数据起点，每 3bit 编码为 TAB+空格串，行宽 8 列对齐。支持 -C Huffman 压缩与 -p ICE 加密，与 snow.exe 双向互通。encode: 消息+容器→隐写文本；decode: 隐写文本→消息 |
| textBlindWatermark | 文本盲水印 | guofei9987/text_blind_watermark v1 JS 版格式：水印逐字符变长二进制（不补零），经单/双 U+200C 藏进掩护文本，每位消耗 1 个掩护字符；与「零宽字符隐写」（Misawa radix-4）互不兼容。encode: 水印+掩护文本→隐写文本；decode: 隐写文本→水印 |
| acrostic | 藏头/藏尾/藏中 | 文本隐写：把隐藏消息字符放在载体每行/句/词的首/尾/中位。encode 需载体，decode 取对应位置字符拼接 |
| everyN | 等距取字隐写 | 文本隐写：每 N 字取一拼隐藏消息。encode 把 msg 字符按每 N 位置 1 个分散进载体，decode 每 N 取第 N 个 |
| caseBitStego | 大小写位隐写 | 文本隐写：用载体字母大小写承载比特（大写=1，小写=0）。msg→UTF-8→比特→改大小写。前 32 比特为长度前缀 |
| nthChar | 第 N 字隐写 | 文本隐写：每行/句/词第 N 字拼隐藏消息（藏头=N1，藏第2字=N2）。encode 替换第 N 字，decode 取第 N 字 |
| wordSpacingBits | 词距位隐写 | 文本隐写：用词间空格数承载比特（1空格=0，2空格=1）。msg→UTF-8→比特→改空格数。前 32 比特为长度前缀 |

### 文件隐写（25 ops）

| opId | 名称 | 说明 |
|---|---|---|
| steghide | steghide 隐写（双向） | steghide 0.5.1 双向：把消息嵌入 JPEG（DCT 系数）或 WAV（样本 LSB），支持口令派生加密与可选压缩；extract 用同一口令取回。载体按魔数分派，仅支持 JPEG 与 WAV。载荷无独立认证标签：取出字节不等于口令已认证。引擎为本地 WASM（单线程） |---|
| audioLsbEmbed | 音频 LSB 嵌入（出题） | 把载荷写进 WAV PCM 样本低位（每样本 1-8 位、按声道选取）生成听不出差别的隐写 WAV；位布局与 audioLsb 提取一一对应；非 WAV 输入按原始 PCM 封装 |
| gifshuffle | GifShuffle 调色板隐写 | 重排 GIF 全局调色板条目顺序藏比特（外观逐像素不变）；兼容 gifshuffle 2.0 的 ICE 加密与内置 Huffman 压缩，支持透明色/动画/局部色表；无全局色表或超容量显式拒绝 |
| outguess | OutGuess 隐写（双向） | OutGuess 0.4 双向：JPEG 走量化 DCT 系数 LSB（产物按质量重编码），PPM/PGM（P2/P3/P5/P6）走像素位；统计保真默认开启；本地 WASM 引擎；载荷无 MAC，取出字节不等于口令已认证 |
| audioLsb | 音频 LSB 提取 | 从 WAV PCM 样本最低有效位提取隐藏比特流 → 文本/hex；支持 8/16/24/32 位深、按声道选取、每样本多位 |
| dctWatermark | DCT 盲水印 | 文本水印嵌入/提取（8×8 DCT 中频 QIM 量化）。嵌入方向输出带水印 PNG，提取方向输出文本，须同强度/通道。 |
| dualFftWatermark | 双图盲水印(F) 频域叠加 | 双图盲水印（半盲）：载体图 + 水印图 → 合成图；给「原图 + 合成图」还原出水印图。2D FFT 域加性扩频 + 行列随机置乱（seed 即工具里的 key）+ 180° 镜像补齐。单张 base64 放不下两张图，第二张图从参数栏粘贴（同「图像差异对比」）。 |
| dwtSvdWatermark | DWT-DCT-SVD 盲水印 | 真盲水印（只需含水印的单图即可提取）：Haar 一级小波低频子带 → 4×4 块 DCT → 奇异值量化嵌入，password_img 决定块内置换、password_wm 决定水印序列洗牌，按 wmBits 做循环冗余 + 3 通道平均。文本模式嵌入/提取文本；图片模式嵌入一张水印图（宽×高即提取 key），提取方向还原出水印图。 |
| deepsoundExtract | DeepSound 提取 | 从 PCM WAV 载体的采样低位提取 DeepSound 隐藏文件（DSC2/DSCF · 明文/AES-256） |
| jphswinLaunch | JPHS · JPEG 隐写 | JPHS for Windows（jphide/jpseek），把数据藏进 JPEG。 本工具为纯 GUI 程序（私有格式 / 无无人值守命令行），本功能仅「启动本机 exe」，点击后在弹出的窗口里手动操作，工具箱不代为喂输入或取结果。仅 Windows，需先起 python bridge.py。 |
| openpuffLaunch | OpenPuff · 多载体 | OpenPuff 多载体隐写（图/音/视/PDF/flash 等），支持多层密码。 本工具为纯 GUI 程序（私有格式 / 无无人值守命令行），本功能仅「启动本机 exe」，点击后在弹出的窗口里手动操作，工具箱不代为喂输入或取结果。仅 Windows，需先起 python bridge.py。 |
| oursecretLaunch | OurSecret · 隐写 | OurSecret GUI 隐写工具，私有格式无法纯前端复刻。 本工具为纯 GUI 程序（私有格式 / 无无人值守命令行），本功能仅「启动本机 exe」，点击后在弹出的窗口里手动操作，工具箱不代为喂输入或取结果。仅 Windows，需先起 python bridge.py。 |
| f5stego | F5 JPEG 隐写 编/解 | F5(f5stegojs 系) JPEG 隐写双向：encode 用密钥把消息经 (1,2^k-1,k) 矩阵编码+收缩写入亮度 DCT 系数并重打包 JPEG（与原版 f5stegojs 互通）；decode 提取隐藏字节流输出 hex/ASCII/UTF-8 + F5 容量诊断 + flag 命中。纯前端，零外发 |
| imgFft | 图像 2D FFT 幅度谱 | 对 PNG/BMP 做 2D 傅里叶变换，输出 log 幅度谱（低频居中/fftshift）。CTF 频域隐写常在幅度谱里藏 flag 文字/图案（图片肉眼正常，频域现形）。重采样到 2 的幂（≤maxSize）。 |
| jsteg | jsteg JPEG 隐写 编/解 | jsteg 隐写双向工具：encode 把消息顺序写入 DCT 系数 LSB（跳过 0 与 ±1，幅值翻转符号不变，避免产生 0），重新 Huffman 编码回写 JPEG（标记段原样保留）；decode 顺序读 LSB 还原消息。封装 = "jsteg" 魔数 + LE32 长度，兼容原版 jsteg CLI 的 hide/reveal。仅基线单扫描 JPEG，渐进式报错。纯前端零外发 |
| lsbEmbed | LSB 嵌入（出题） | 把载荷文本写进封面图（PNG/BMP）指定位平面的最低有效位，生成隐写图 PNG（通道顺序/位平面/位序与 zstegScan 一一对应，出 misc 题用） |
| lsbImage | LSB 像素隐写 | 最低有效位像素隐写（前 32 位存长度，支持 R/G/B/A 通道选择，多位深 1-3 位/通道）。提取时若图中不是本格式（位流无长度前缀），自动改按原始位流提取最长可读文本；两者都没有才报错并给出原因。 |
| pixelJihad | PixelJihad | PixelJihad 隐写（SHA-256 种子 + 伪随机 LSB + 可选 AES-CCM 加密） |
| arnoldCat | Arnold 猫脸变换 | Arnold 猫脸变换置乱（正方形图像，参数化矩阵 [[1,a],[b,ab+1]]，a=b=1 为标准版） |
| arnoldCatBrute | Arnold 猫脸暴破 | 全参数暴力破解：a/b/迭代次数三维范围遍历反向还原，候选缩略图网格拼图输出（随参数范围增大耗时线性增长） |
| stegosaurus | Stegosaurus pyc 隐写检测 | 解析 .pyc 头定 Python 版本 + 递归解 marshal code object，扫描字符串常量藏的 flag、检测 co_lnotab 行号表异常并抽 LSB bit 流：纯前端静态分析，不执行 pyc |
| stegpy | stegpy 隐写（stegv3） | stegpy 工具兼容隐写：bit 平面交错 1/2/4 位 + 可选 PBKDF2-Fernet 密码加密，无损图像载体（stegv3 魔数帧） |
| stereogramSolver | 立体图求解 | Autostereogram 立体图隐写求解：图像与自身水平循环位移相减（roll+diff），正确 offset 下深度条纹显形。offset 单值精确解，留空自动扫描拼图 |
| ttlStego | TTL 隐写（IP 包 TTL 序列） | IP 包 TTL 值序列 ↔ 文本：4 锚点(0/64/128/255)各代表 2bit，4 个包拼 1 字节。解码容忍实测抖动值（按最近锚点归一） |
| watermarkhFft | WaterMarkH 频域隐形水印 | 复刻 WaterMarkH（吾爱版 1.2.0.0）的隐形水印：把「黑底白字 + 中心对称镜像」的图案**直接当作频谱**，按 输出 = 256×\|x + (α/√N)·DFT(W)\| 叠加到三通道；提取取通道**幅度谱**，文字在频谱图上肉眼可读。需 2 的幂尺寸，故有 5 种几何方案。本版增强：图案可用文字（多行）或图片、可设位置，提取支持自动增益 / 去背景归一化 / 压制镜像副本。无密钥、无纠错码。 |

## 插件与 AI 接入

工具箱是声明式注册表驱动的：每个算法就是一条 `{id, cat, name, params, encode/decode/run, detect}` 记录，UI 全自动渲染。这套契约同样对第三方开放。

### 插件 SDK

第三方可零主项目改动写插件：一个插件 = 一个标准 ESM 模块，只面对宿主注入的受控 `ctx`，不 import 主项目内部模块。插件能注册算法 op（自动进菜单、搜索、一键解码）、新增分类、注入多语言文案、用命名空间隔离的本地存储。所有注册动作在卸载时精确回收。

- 开发指南：[`src/plugin/README.md`](./src/plugin/README.md)
- 参考插件（活样板，照抄改名即起步）：[`src/plugin/examples/hello-cipher/index.js`](./src/plugin/examples/hello-cipher/index.js)

### 给外部 AI 用（MCP / Skills）

工具箱的能力面可暴露给支持 MCP 的 AI 客户端或 Agent，全程本地进程、零外发。能力面单一事实源在 `src/plugin/mcpBridge.js`，对外提供 6 个 MCP 工具：列分类、列 op、查 op 参数 schema、智能识别编码、跑指定 op、一键智能解码。浏览器内 AI 面板、Node stdio server、CLI Skill 三端复用同一份定义。

- MCP server（Claude Desktop 等接入）：[`mcp/README.md`](./mcp/README.md)
- Skill（Claude Code / CLI Agent）：[`skills/ebctf-decode/`](./skills/ebctf-decode/)

AI 的联网出口只有可选的 `aiClient`，且必须用户自备 endpoint + key，直连用户站点，主项目不中转、不记录。默认关闭。

## 贡献者

以下名单与工具箱「关于」页的「作者与贡献者」完全一致，按关于页顺序列出。

**创始人 · 作者**

- 恒烈 · EternalBlaze — 创始人 · 作者。

**作者**

- 小布丁 — 作者。

**贡献者**

- Enze：提出配方链交互优化方案。
- yy2m1a0 — 内测员 · 一键多重解码评分算法优化。
- 霍雅 — 内测员 · 昼夜切换优化。
- 0x0off — 内测员 · 真题算法补充建议。
- 懒羊羊大王 — 内测员 · 发现 fancy 系列算法判定过于严谨，促成宽松判定模式。
- 风之暇想 — 内测员 · 新增多种现代加密算法提议。
- jluvb — V0.1.2 部分编码转义错误纠正。
- smile1110 — 提出 ECC 等现代密码算法扩充提议（v0.1.6 密钥生命周期与签名扩充方向即由此推进）。
- 拉面：反馈千千秀字、佛曰、SNOW 的原版兼容性，Unicode 与 Twin-Hex 空白边界，以及 Whitespace 执行、Malbolge 识别问题；提出 Scytale 双密钥形式、零宽隐写字符集与格式扩充、科普和工具分类纠正、Brainfuck 非标准变体功能取舍建议。
- qinling072：提出补充 OutGuess 等图像隐写算法。

## Community

- [Linux.Do](https://linux.do) — 本项目非常认可 LinuxDo 社区！

## 开源协议

本项目自有代码采用 **Apache License 2.0**，可自由使用、修改与再分发，详见根目录 [`LICENSE`](./LICENSE) 全文。第三方资源按各自许可证使用。

第三方组件（如 vendored 的 abracadabra-cn、各 WASM 库等）各自遵循其原始许可证。

## 第三方资源与许可

本项目自身代码依 Apache License 2.0 授权。使用的第三方资源如下：

### 图标 · Material Symbols Rounded

- 来源：Google [Material Symbols](https://fonts.google.com/icons)（`@material-symbols/svg-400`）
- 许可：**Apache License 2.0**，可自由商用 / 修改 / 再分发。
- 用法：官方 SVG path 内联进 `src/ui/icons.js`，零请求、零 CDN。

### 字体 · 天珩全字库（全字堂）

- 来源：沈天珩「全字堂」 <http://cheonhyeong.com/index.html>
- 版本：天珩全字库 V5.0.0（编译日期 2025-09-25）
- 覆盖：全 Unicode，支持 15 万余汉字及 Unicode 17.0 所定义的各类符号、小语种等。
- 文件：`public/fonts/th/th-ctf-subset.woff2`（首屏子集）、`th-p0.woff2`（平面 0 BMP）、`th-p1.woff2`（平面 1 SMP）、`th-p2.woff2`（平面 2 SIP）、`th-p16.woff2`（平面 3+）。
- **许可与使用声明**：天珩官方说明第六条载明「为保护字库之版权（包括各大公司的字形版权和本人的整理制作）……**请勿用于商业用途**」。本项目为开源、非商业的 CTF 学习工具，仅在本地引用天珩字库用于显示生僻字符，不对字库本身做任何商业利用，符合上述使用边界。天珩字库的版权归沈天珩及相关字形原始版权方所有；如需商用请联系原作者获取授权，或替换为可商用字体（如思源黑体 / 花园明朝 HanaMin，均为 SIL OFL 许可）。

## 隐私

零外发是本工具的招牌：核心算法默认不上传用户输入；PWA 与检查更新只下载本站资源；本地桥只访问 `127.0.0.1`；外部 AI 仅在用户主动配置 endpoint 与密钥后直连该地址，主项目不做中转或记录。
