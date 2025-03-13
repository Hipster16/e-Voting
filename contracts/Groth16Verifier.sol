// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax  = 14283037623623406307789259956568745437414431940843287236128029038901406649740;
    uint256 constant alphay  = 18252352800899676779910006052866456482536840458721989505296072714793642238641;
    uint256 constant betax1  = 7920192703010766166117798148996380720869914657022032221675732553171239250254;
    uint256 constant betax2  = 12089162191329722020699921979605188486535010458226627403468820693721916285382;
    uint256 constant betay1  = 1379971011547723695510866714017314381348603870213615154412084557688898791230;
    uint256 constant betay2  = 3734408182450792968204853656338496319412292136122589592022333999355860133073;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 13386023383410152149189262026382625942610073496330751131751690843850883050325;
    uint256 constant deltax2 = 3927181456212119609487122980892682843022021198589385184623083071462648184693;
    uint256 constant deltay1 = 16996426165347562090641178219014379965963811970372955135798537616782740652414;
    uint256 constant deltay2 = 1840506170774246847892267955451738163561936105531113787900603687499930159397;

    
    uint256 constant IC0x = 7441465491370274318370223041701751343747974233043250909897637420046723288751;
    uint256 constant IC0y = 12625652822967104145530182862108234836286877292141463422105713842761052287153;
    
    uint256 constant IC1x = 19768363762532785758238040444775581322981339842342647916952648899005336082441;
    uint256 constant IC1y = 10611330377872071268886544455510035119834326402228194182353601418487663120262;
    
    uint256 constant IC2x = 6942655832087129705152414295772149638903782291907312961081046676732213823380;
    uint256 constant IC2y = 725374916438260006568105616580763602634788790425113584255199481511700304025;
    
    uint256 constant IC3x = 10882085181346650297174733914830189655063892552436477868426668649165886618483;
    uint256 constant IC3y = 5449882401359460475079509805590574094158746409746621166083697632361841831026;
    
    uint256 constant IC4x = 18451838938496649757686247715734444711496203536616179104580524794369706832833;
    uint256 constant IC4y = 17539753707247311197327678466782418504909853409528175534792804751334930346669;
    
    uint256 constant IC5x = 8119579638809468740042213176640609848088354998462582612268165463706004439158;
    uint256 constant IC5y = 9652270238343519075889815606128629112953984436668065179668040525474299657260;
    
    uint256 constant IC6x = 19001651052783821155441200000303763069950366596041212682587133450767095336061;
    uint256 constant IC6y = 3750498080619219842979694156675132154410248095814862144579535251828105661228;
    
    uint256 constant IC7x = 10917799378106795542568789123231313184200453065200611082555617944040529342105;
    uint256 constant IC7y = 11359954011413068165891156814281640589346811462204451666957843745022487842166;
    
    uint256 constant IC8x = 2847870342260061770155982826090132104079604435603143877382199046816167096302;
    uint256 constant IC8y = 7785140996619210256793910878355859068937412819773462350063544033061308083721;
    
    uint256 constant IC9x = 4395336912826996044995788984597666572568371149952073365605221890674713371467;
    uint256 constant IC9y = 17954356468557291987953706189258720852453968785250887296929581833418342610144;
    
    uint256 constant IC10x = 16546056009352369197675551827697038141240446924406039402695861978112980185334;
    uint256 constant IC10y = 10758216210096420379159226606799042633414763614864838104498124495106604008041;
    
    uint256 constant IC11x = 8562480420578145042956352194986242076637260494055706597565371068227131715871;
    uint256 constant IC11y = 14962194574991292878472651406239081860739640020943111754619060207468370591225;
    
    uint256 constant IC12x = 1796883623864621735446649630627042956945695085207463393143875993292159378630;
    uint256 constant IC12y = 21133097762147346676452376897612109010418884162312356534856220508364926010949;
    
    uint256 constant IC13x = 17927823922311542929736331035756774741889736590117748838580284746169673931114;
    uint256 constant IC13y = 2058948134580273830851475203930268720932855845633314960895273897863497621161;
    
    uint256 constant IC14x = 3375002484315589232752943326752909323046632388452088334692211140911471374843;
    uint256 constant IC14y = 19825981892800092477800002853963773020728208736449529889684694920884492021563;
    
    uint256 constant IC15x = 8960178366036238829258307568024012264489921538723122572905422863963302753597;
    uint256 constant IC15y = 180980804926884352661912466495787093813580715469235528411448313889328501713;
    
    uint256 constant IC16x = 9914616637632103818653656335934799859412850782974960719131633112202826588702;
    uint256 constant IC16y = 20329612168101758344787233420644141284777533664424033030167340217013716339511;
    
    uint256 constant IC17x = 21630486324337489605260412195536021868948437135574294164292786402266306539732;
    uint256 constant IC17y = 1041206415467920224103128110714780003823820185523158574570068129339935882527;
    
    uint256 constant IC18x = 1403297988264431304260719270228306437199156035724567735239155240872083053733;
    uint256 constant IC18y = 6171196419262854594740207469204275496737984748842583642064490523935441984316;
    
    uint256 constant IC19x = 7092791883715511802998882675362616095384885413826252124957888080726028407192;
    uint256 constant IC19y = 2654333666473421841655091074960315170719140639357268633363153162533730307363;
    
    uint256 constant IC20x = 5513882182253432514615465820497388221052789405434093598065915651632836097032;
    uint256 constant IC20y = 7946863358810348765819231266785941931581868710235844320979870079573705930331;
    
    uint256 constant IC21x = 464789006332228786295253375914313616429477013364724171734220586973668736334;
    uint256 constant IC21y = 13596084702973433911530273636522635555441211973272224227622765694966559184814;
    
    uint256 constant IC22x = 9472781744115382623218522019016633407911821141316375172912075332322358231826;
    uint256 constant IC22y = 5082420558438291485375125358405492395115649834168493105497810062085340133057;
    
    uint256 constant IC23x = 5241025915320958687159988011023507840820059691626452379398723376170509185044;
    uint256 constant IC23y = 19125242737383552017207941581958447267419259487420612016986183928838439678593;
    
    uint256 constant IC24x = 7228608971403707335519847166980377894637623788419923128375378249989618750801;
    uint256 constant IC24y = 20072764650853033488406769296311090143832890720826475493037317721086456505092;
    
    uint256 constant IC25x = 20602701263071747147799583655259887792653138287181113361524911659186802153210;
    uint256 constant IC25y = 19249274622995008368437726318805763377263963999472486291810273904659648128036;
    
    uint256 constant IC26x = 17010475564974893646880286039164162086511647848135444725235758329511677152495;
    uint256 constant IC26y = 12285741186241164303652709582559795389003492979205930538095368640077656726673;
    
    uint256 constant IC27x = 21837437402346249125027073893904212927540935988129278294741867886146899919242;
    uint256 constant IC27y = 4502493216591405246836732531992356623817187451199533383414956313108838962166;
    
    uint256 constant IC28x = 17609584159701400877092897335409787811768182946619692328217047251180392206329;
    uint256 constant IC28y = 8631551372423693189363157506061372200899122079345649472238138515863437730698;
    
    uint256 constant IC29x = 10881419876623135068799071877566147162535982001972483567502471580993899631685;
    uint256 constant IC29y = 15402462008571423679023626267968769015919701457986393469990491232507884623566;
    
    uint256 constant IC30x = 141543521255672220090612175699104363679652229602370650618929174398806066005;
    uint256 constant IC30y = 3486877277833835636143698103493358815521051761097707122298213977116138572681;
    
    uint256 constant IC31x = 10111223381460492511420600201983121156916330712855637992553348019702454874853;
    uint256 constant IC31y = 9313449124211770331730169080401379664212474570450494942005834057157372803510;
    
    uint256 constant IC32x = 15873537098986411442272181593958194487707309237573578869729211072544311521853;
    uint256 constant IC32y = 10824966438925955973177946834126212173480258707598333972096298344817538124519;
    
    uint256 constant IC33x = 7472595502987225331224044291159080770199967927128492842154424209642246503385;
    uint256 constant IC33y = 12007307755064248480783943095520710268681391820174691918935605594451134159706;
    
    uint256 constant IC34x = 4109518095113678403861140695179519358177096806180660117985072868356819794111;
    uint256 constant IC34y = 2773752820238662889875842094774808589314365554779682377710339864346361347295;
    
    uint256 constant IC35x = 9482141994966454090445003726579985432414298363711963552109283266293419863911;
    uint256 constant IC35y = 15913374023733462599072694240606171916620885182465884769857591125219248996484;
    
    uint256 constant IC36x = 4455800075982407794738515035277013945325340674206152061123378762773788545214;
    uint256 constant IC36y = 3566380196551200369622590690035030150962214610029246600696869568149564826140;
    
    uint256 constant IC37x = 4065857927006540344543910675649695598760039348320352966919940042788530215985;
    uint256 constant IC37y = 11931584812327979257556060709992746923633325134797277336838987142698783304794;
    
    uint256 constant IC38x = 2097411290338851988887202997042345535069892734533869173244539399087697432551;
    uint256 constant IC38y = 6399290306833075537633788876441644139579755044854493199594561959486322603191;
    
    uint256 constant IC39x = 2361233055448642605805252524965637032063316538535472678334567915077517187760;
    uint256 constant IC39y = 6901229713905493049159581709667344162001155390809346565507880800204265400427;
    
    uint256 constant IC40x = 12927997215760445460963004925015683780646601635825552717558379865792664323793;
    uint256 constant IC40y = 4424385683382632048643352874861023620182196391622432039808087400355520381728;
    
    uint256 constant IC41x = 1695844645871316881087223438701387527235910734422646182336245982833003349254;
    uint256 constant IC41y = 3805079485478972973665507496388490412634584898151017578614115092898001055980;
    
    uint256 constant IC42x = 16386273219804520364742763093739138404562630869737219496177856943843720408148;
    uint256 constant IC42y = 1183450762315392652102005552220058583784041364806418517457303874621193500466;
    
    uint256 constant IC43x = 18501013851027765593757311529542240155396446669872175049616261415348975485444;
    uint256 constant IC43y = 3772486593699022096899638449758909573561016561895749372626882448396516744308;
    
    uint256 constant IC44x = 10216800798586468484988916938646229220345913704379292646106805572779568087052;
    uint256 constant IC44y = 279861077331713328540935244206153605682582254585584720315144595750950989695;
    
    uint256 constant IC45x = 10877300245506514307332289989988099990835383270120126660755669798117378931682;
    uint256 constant IC45y = 21056264172056802763097298770676459636271837585660817126931359099841299935267;
    
    uint256 constant IC46x = 18808384673884002941493603140241978430679749732306334671937249645798908498645;
    uint256 constant IC46y = 3020185031666050938499921848364025467990518802544926933242601939777432150289;
    
    uint256 constant IC47x = 19083958264768694977538953053689878290158958741639832759824063582206863777463;
    uint256 constant IC47y = 2600123151577323846817195832923775292422822659958432420968880075686003515497;
    
    uint256 constant IC48x = 8640265042769305691677633915534069914442302490230325496149639983951352318253;
    uint256 constant IC48y = 8856531802356435823794345468544331390778613409458953849116248314057727848385;
    
    uint256 constant IC49x = 8415532789477555125043966188288004177164051371429432263514673801020471705034;
    uint256 constant IC49y = 691170944278883492383594690556683764690548056217365834994441757103391333253;
    
    uint256 constant IC50x = 14834377001908611953285450980065829077618635252152024755337162198674950113062;
    uint256 constant IC50y = 17489318792509995421555931048142411322289081896769211392523552462510748513434;
    
    uint256 constant IC51x = 15783637334392542811227612254769414199450878501089894318033658051497437968976;
    uint256 constant IC51y = 16227434003114695374683319053199185648478241200400108175212100326988909908482;
    
    uint256 constant IC52x = 2731193856487797855605958173967573495461852858006111020148907069503987983070;
    uint256 constant IC52y = 2031487791878624497943639134334554065353636893344013913641331415769399993208;
    
    uint256 constant IC53x = 473973376134672685598163880398545020128563397430024923084615186584074543598;
    uint256 constant IC53y = 2341058675996282170616116671509776228315725482931352903170883129327116580769;
    
    uint256 constant IC54x = 5610390672668981728551747531516408021920380195216865788966913816857247395308;
    uint256 constant IC54y = 19924735874051964181365246761100690151152123160867178451255618337110734909064;
    
    uint256 constant IC55x = 13997218938855177191067972963256684277441363125956089622557295846792053252145;
    uint256 constant IC55y = 20398876986920134707596569896365522182829007414636076616562067733709669469186;
    
    uint256 constant IC56x = 20037278377965246934812894062840304164326314563410492171188115398370194342682;
    uint256 constant IC56y = 4016463819692290871231541366947264934398103165428459818418999409451009776419;
    
    uint256 constant IC57x = 3038652685699875146302690175301827531430832413059417655203161194753608510042;
    uint256 constant IC57y = 15667358617469887825643975713303817842928428804146039791122090679953089682982;
    
    uint256 constant IC58x = 14953350813526191556211894316743666301765700343301647189985882119192882085238;
    uint256 constant IC58y = 14511300917241260535984817842550329746881335743376591692317614011820749551491;
    
    uint256 constant IC59x = 159298601183865092485165183848390583298905257329541694026908263287752249979;
    uint256 constant IC59y = 19894381195830462104844178570769616078207367539819059160171927387772743301331;
    
    uint256 constant IC60x = 16469524827601821479429647219451609523239564819966950029374470771747866109028;
    uint256 constant IC60y = 18305718051459347172302721894892186869829396641490511547707228105415005191644;
    
    uint256 constant IC61x = 15343871946202338571443206106170877765420409963789065555931267627941128162894;
    uint256 constant IC61y = 10182299229040388371373816443121372287254930233399788773004522823854324217565;
    
    uint256 constant IC62x = 12510802562109558244288234326073217198017035793579344732993461346860018126285;
    uint256 constant IC62y = 4973309098358220531348567224469671572516417684148198358678841893451345675405;
    
    uint256 constant IC63x = 19220300374361857101531252719627939799465413805328247980642708222836485903758;
    uint256 constant IC63y = 19438304392930665352471038840612131127385641455381560982193566060218235201647;
    
 
    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[63] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, r)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }
            
            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))
                
                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))
                
                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))
                
                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))
                
                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))
                
                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))
                
                g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))
                
                g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))
                
                g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))
                
                g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))
                
                g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))
                
                g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))
                
                g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))
                
                g1_mulAccC(_pVk, IC16x, IC16y, calldataload(add(pubSignals, 480)))
                
                g1_mulAccC(_pVk, IC17x, IC17y, calldataload(add(pubSignals, 512)))
                
                g1_mulAccC(_pVk, IC18x, IC18y, calldataload(add(pubSignals, 544)))
                
                g1_mulAccC(_pVk, IC19x, IC19y, calldataload(add(pubSignals, 576)))
                
                g1_mulAccC(_pVk, IC20x, IC20y, calldataload(add(pubSignals, 608)))
                
                g1_mulAccC(_pVk, IC21x, IC21y, calldataload(add(pubSignals, 640)))
                
                g1_mulAccC(_pVk, IC22x, IC22y, calldataload(add(pubSignals, 672)))
                
                g1_mulAccC(_pVk, IC23x, IC23y, calldataload(add(pubSignals, 704)))
                
                g1_mulAccC(_pVk, IC24x, IC24y, calldataload(add(pubSignals, 736)))
                
                g1_mulAccC(_pVk, IC25x, IC25y, calldataload(add(pubSignals, 768)))
                
                g1_mulAccC(_pVk, IC26x, IC26y, calldataload(add(pubSignals, 800)))
                
                g1_mulAccC(_pVk, IC27x, IC27y, calldataload(add(pubSignals, 832)))
                
                g1_mulAccC(_pVk, IC28x, IC28y, calldataload(add(pubSignals, 864)))
                
                g1_mulAccC(_pVk, IC29x, IC29y, calldataload(add(pubSignals, 896)))
                
                g1_mulAccC(_pVk, IC30x, IC30y, calldataload(add(pubSignals, 928)))
                
                g1_mulAccC(_pVk, IC31x, IC31y, calldataload(add(pubSignals, 960)))
                
                g1_mulAccC(_pVk, IC32x, IC32y, calldataload(add(pubSignals, 992)))
                
                g1_mulAccC(_pVk, IC33x, IC33y, calldataload(add(pubSignals, 1024)))
                
                g1_mulAccC(_pVk, IC34x, IC34y, calldataload(add(pubSignals, 1056)))
                
                g1_mulAccC(_pVk, IC35x, IC35y, calldataload(add(pubSignals, 1088)))
                
                g1_mulAccC(_pVk, IC36x, IC36y, calldataload(add(pubSignals, 1120)))
                
                g1_mulAccC(_pVk, IC37x, IC37y, calldataload(add(pubSignals, 1152)))
                
                g1_mulAccC(_pVk, IC38x, IC38y, calldataload(add(pubSignals, 1184)))
                
                g1_mulAccC(_pVk, IC39x, IC39y, calldataload(add(pubSignals, 1216)))
                
                g1_mulAccC(_pVk, IC40x, IC40y, calldataload(add(pubSignals, 1248)))
                
                g1_mulAccC(_pVk, IC41x, IC41y, calldataload(add(pubSignals, 1280)))
                
                g1_mulAccC(_pVk, IC42x, IC42y, calldataload(add(pubSignals, 1312)))
                
                g1_mulAccC(_pVk, IC43x, IC43y, calldataload(add(pubSignals, 1344)))
                
                g1_mulAccC(_pVk, IC44x, IC44y, calldataload(add(pubSignals, 1376)))
                
                g1_mulAccC(_pVk, IC45x, IC45y, calldataload(add(pubSignals, 1408)))
                
                g1_mulAccC(_pVk, IC46x, IC46y, calldataload(add(pubSignals, 1440)))
                
                g1_mulAccC(_pVk, IC47x, IC47y, calldataload(add(pubSignals, 1472)))
                
                g1_mulAccC(_pVk, IC48x, IC48y, calldataload(add(pubSignals, 1504)))
                
                g1_mulAccC(_pVk, IC49x, IC49y, calldataload(add(pubSignals, 1536)))
                
                g1_mulAccC(_pVk, IC50x, IC50y, calldataload(add(pubSignals, 1568)))
                
                g1_mulAccC(_pVk, IC51x, IC51y, calldataload(add(pubSignals, 1600)))
                
                g1_mulAccC(_pVk, IC52x, IC52y, calldataload(add(pubSignals, 1632)))
                
                g1_mulAccC(_pVk, IC53x, IC53y, calldataload(add(pubSignals, 1664)))
                
                g1_mulAccC(_pVk, IC54x, IC54y, calldataload(add(pubSignals, 1696)))
                
                g1_mulAccC(_pVk, IC55x, IC55y, calldataload(add(pubSignals, 1728)))
                
                g1_mulAccC(_pVk, IC56x, IC56y, calldataload(add(pubSignals, 1760)))
                
                g1_mulAccC(_pVk, IC57x, IC57y, calldataload(add(pubSignals, 1792)))
                
                g1_mulAccC(_pVk, IC58x, IC58y, calldataload(add(pubSignals, 1824)))
                
                g1_mulAccC(_pVk, IC59x, IC59y, calldataload(add(pubSignals, 1856)))
                
                g1_mulAccC(_pVk, IC60x, IC60y, calldataload(add(pubSignals, 1888)))
                
                g1_mulAccC(_pVk, IC61x, IC61y, calldataload(add(pubSignals, 1920)))
                
                g1_mulAccC(_pVk, IC62x, IC62y, calldataload(add(pubSignals, 1952)))
                
                g1_mulAccC(_pVk, IC63x, IC63y, calldataload(add(pubSignals, 1984)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            
            checkField(calldataload(add(_pubSignals, 128)))
            
            checkField(calldataload(add(_pubSignals, 160)))
            
            checkField(calldataload(add(_pubSignals, 192)))
            
            checkField(calldataload(add(_pubSignals, 224)))
            
            checkField(calldataload(add(_pubSignals, 256)))
            
            checkField(calldataload(add(_pubSignals, 288)))
            
            checkField(calldataload(add(_pubSignals, 320)))
            
            checkField(calldataload(add(_pubSignals, 352)))
            
            checkField(calldataload(add(_pubSignals, 384)))
            
            checkField(calldataload(add(_pubSignals, 416)))
            
            checkField(calldataload(add(_pubSignals, 448)))
            
            checkField(calldataload(add(_pubSignals, 480)))
            
            checkField(calldataload(add(_pubSignals, 512)))
            
            checkField(calldataload(add(_pubSignals, 544)))
            
            checkField(calldataload(add(_pubSignals, 576)))
            
            checkField(calldataload(add(_pubSignals, 608)))
            
            checkField(calldataload(add(_pubSignals, 640)))
            
            checkField(calldataload(add(_pubSignals, 672)))
            
            checkField(calldataload(add(_pubSignals, 704)))
            
            checkField(calldataload(add(_pubSignals, 736)))
            
            checkField(calldataload(add(_pubSignals, 768)))
            
            checkField(calldataload(add(_pubSignals, 800)))
            
            checkField(calldataload(add(_pubSignals, 832)))
            
            checkField(calldataload(add(_pubSignals, 864)))
            
            checkField(calldataload(add(_pubSignals, 896)))
            
            checkField(calldataload(add(_pubSignals, 928)))
            
            checkField(calldataload(add(_pubSignals, 960)))
            
            checkField(calldataload(add(_pubSignals, 992)))
            
            checkField(calldataload(add(_pubSignals, 1024)))
            
            checkField(calldataload(add(_pubSignals, 1056)))
            
            checkField(calldataload(add(_pubSignals, 1088)))
            
            checkField(calldataload(add(_pubSignals, 1120)))
            
            checkField(calldataload(add(_pubSignals, 1152)))
            
            checkField(calldataload(add(_pubSignals, 1184)))
            
            checkField(calldataload(add(_pubSignals, 1216)))
            
            checkField(calldataload(add(_pubSignals, 1248)))
            
            checkField(calldataload(add(_pubSignals, 1280)))
            
            checkField(calldataload(add(_pubSignals, 1312)))
            
            checkField(calldataload(add(_pubSignals, 1344)))
            
            checkField(calldataload(add(_pubSignals, 1376)))
            
            checkField(calldataload(add(_pubSignals, 1408)))
            
            checkField(calldataload(add(_pubSignals, 1440)))
            
            checkField(calldataload(add(_pubSignals, 1472)))
            
            checkField(calldataload(add(_pubSignals, 1504)))
            
            checkField(calldataload(add(_pubSignals, 1536)))
            
            checkField(calldataload(add(_pubSignals, 1568)))
            
            checkField(calldataload(add(_pubSignals, 1600)))
            
            checkField(calldataload(add(_pubSignals, 1632)))
            
            checkField(calldataload(add(_pubSignals, 1664)))
            
            checkField(calldataload(add(_pubSignals, 1696)))
            
            checkField(calldataload(add(_pubSignals, 1728)))
            
            checkField(calldataload(add(_pubSignals, 1760)))
            
            checkField(calldataload(add(_pubSignals, 1792)))
            
            checkField(calldataload(add(_pubSignals, 1824)))
            
            checkField(calldataload(add(_pubSignals, 1856)))
            
            checkField(calldataload(add(_pubSignals, 1888)))
            
            checkField(calldataload(add(_pubSignals, 1920)))
            
            checkField(calldataload(add(_pubSignals, 1952)))
            
            checkField(calldataload(add(_pubSignals, 1984)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }
