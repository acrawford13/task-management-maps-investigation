import { getMidpoint } from './map';

const route = {
  bounds: {
    northeast: {
      lat: -35.1761883,
      lng: 149.114499,
    },
    southwest: {
      lat: -35.240357,
      lng: 149.0454304,
    },
  },
  copyrights: 'Map data ©2018 Google',
  legs: [
    {
      arrival_time: {
        text: '08:43',
        time_zone: 'Australia/Sydney',
        value: 1542059031,
      },
      departure_time: {
        text: '07:42',
        time_zone: 'Australia/Sydney',
        value: 1542055369,
      },
      distance: {
        text: '18.8 km',
        value: 18817,
      },
      duration: {
        text: '1 hour 1 min',
        value: 3662,
      },
      end_address: '81 Ferguson Circuit, Ngunnawal ACT 2913, Australia',
      end_location: {
        lat: -35.1770033,
        lng: 149.1144793,
      },
      start_address: '56 Hannaford St, Page ACT 2614, Australia',
      start_location: {
        lat: -35.23957,
        lng: 149.0454304,
      },
      steps: [
        {
          distance: {
            text: '54 m',
            value: 54,
          },
          duration: {
            text: '1 min',
            value: 40,
          },
          end_location: {
            lat: -35.2392555,
            lng: 149.0457424,
          },
          polyline: {
            points: 'hvavE}lul[YQGAGAIAKA@c@',
          },
          start_location: {
            lat: -35.23957,
            lng: 149.0454304,
          },
          steps: [
            {
              distance: {
                value: 100,
              },
              duration: {
                text: '1 min',
                value: 26,
              },
              end_location: {
                lat: -35.2392471,
                lng: 149.0455624,
              },
              polyline: {
                points: 'hvavE}lul[YQGAGAIAKA',
              },
              start_location: {
                lat: -35.23957,
                lng: 149.0454304,
              },
              travel_mode: 'WALKING',
            },
            {
              distance: {
                text: '16 m',
                value: 16,
              },
              duration: {
                text: '1 min',
                value: 14,
              },
              end_location: {
                lat: -35.2392555,
                lng: 149.0457424,
              },
              maneuver: 'turn-right',
              polyline: {
                points: 'htavEwmul[@c@',
              },
              start_location: {
                lat: -35.2392471,
                lng: 149.0455624,
              },
              travel_mode: 'WALKING',
            },
          ],
          travel_mode: 'WALKING',
        },
        {
          distance: {
            text: '2.0 km',
            value: 2002,
          },
          duration: {
            text: '7 mins',
            value: 420,
          },
          end_location: {
            lat: -35.238972,
            lng: 149.064026,
          },
          polyline: {
            points:
              '~savE}nul[J@?ADeCZoD@k@F}@RgC?APkBJwAnAkODi@?ABOFm@ZaAcCgBeAw@_@_@g@{@[{@E]CMESEi@?_ABk@~@mGN}@Lw@VqA^u@b@c@f@WfAWe@yDSeBGe@SgBCQCMe@cEYyBa@iDeDp@AWAU?SFSHMROTGXOZOGS',
          },
          start_location: {
            lat: -35.239204,
            lng: 149.045746,
          },
          transit_details: {
            arrival_stop: {
              location: {
                lat: -35.238972,
                lng: 149.064026,
              },
              name: 'Westfield Bus Stn',
            },
            arrival_time: {
              text: '07:51',
              time_zone: 'Australia/Sydney',
              value: 1542055860,
            },
            departure_stop: {
              location: {
                lat: -35.239204,
                lng: 149.045746,
              },
              name: 'Petterd St after Roseby St',
            },
            departure_time: {
              text: '07:44',
              time_zone: 'Australia/Sydney',
              value: 1542055440,
            },
            headsign: 'Tuggeranong',
            line: {
              agencies: [
                {
                  name: 'Transport Canberra',
                  phone: '011 61 131710',
                  url: 'https://www.transport.act.gov.au/',
                },
              ],
              color: '#0d47a1',
              name: 'Blue Rapid City & Fraser',
              short_name: '314',
              text_color: '#ffffff',
              url: 'http://www.transport.act.gov.au/routes-and-timetables/timetables/',
              vehicle: {
                icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
                name: 'Bus',
                type: 'BUS',
              },
            },
            num_stops: 5,
          },
          travel_mode: 'TRANSIT',
        },
        {
          distance: {
            text: '16.6 km',
            value: 16552,
          },
          duration: {
            text: '31 mins',
            value: 1860,
          },
          end_location: {
            lat: -35.176716,
            lng: 149.11351,
          },
          polyline: {
            points:
              'pravEeayl[FRDCTKRSr@cA~@wB^uAHq@_@oT?CI}EI]AaAW{AEUA[BO?[@sAE{DBmK?[@cBcEkCqAs@{Am@u@QiCm@oAc@kA[wA_@QGwAa@y@[iAg@{A{@_Ag@YOiCcBcBcAmCkAc@M]COBWP[j@wAlF{@tBe@~@gApBuAdBs@t@cA`AeBpAiBlAqIxEeE~BiBlAwA~AcAxA_AlBs@nBg@jBg@OaAUYEWAw@?aANw@Xs@`@wAv@_Bl@eFlBaBl@q@R}@Fw@Eo@My@a@o@m@U[CC{B{DS]w@iAu@w@sF_EUSiAwAg@}@GMCCe@qAa@yAQaAOyAEwA?mAFcBFuA@MHeBPsDJoBBg@?q@?a@ImAUiAWw@]s@m@w@c@c@o@_@{@]]E?AiF}@_A[cAi@aAu@o@k@dAmBj@}@x@y@x@g@f@SlGqB?A@?v@Ur@e@f@g@h@u@Xq@Rs@Ja@@_@LeAAa@GMm@o@g@S[IkAMaCUkC]uBi@e@OeAg@?AeAg@kASO@QKEMg@m@uBwACAs@]mBk@oB[k@EcEMcBQ_B_@i@QmAk@uA_A}@y@{@eAm@y@k@s@c@u@k@kA[y@Su@Ko@G}@OcAKQKGY?MFa@^_BnBuAjBaa@dh@oAe@gHqCIJK@SxAOZoAjAURMb@M~AEPo@p@wF`H{GhIq@dAAXGLMFOCKMCU?EcCyD_@c@YWg@W}Ac@c@Si@]o@m@Ya@eAeCGAKIGOBSBESu@E[?AGg@IgAEqA?cDGgAKq@a@uASc@OCGQ?Ec@s@_@cACG?AS{@UmAWoBe@kB[o@M?MGEQ?EDOHGLAhA_ADGz@iB?A@?\\u@`@u@AQ@CJMLAFBj@[LKj@WVCl@@d@LNH|@l@j@d@Lh@@j@Ml@_@b@e@`@u@Hm@AQHKPg@@EFkA?ADw@Js@Xo@LQ`@[f@QhCI|AEt@CNAf@S@ELGF@FFPDX@fBEhAM^UFGHKL@h@If@c@PWVc@?APc@Lo@Fu@@o@KkAYaA_@q@k@k@WQA?qAy@_@II@KEAEAISc@w@cAs@sAQi@iAcDe@y@IK_@QG@KECE?KIMUQ_Ag@m@KCAKDc@^IDk@\\uBrAa@`@c@l@aAvA]Tc@JoBF[LOJMNSb@YnAUd@YTWJa@B}AUc@IoB[Y?e@Nc@ABCJIHM@KGEO@QIgAAKI]e@oBSYWOyEU[OcAyAi@SGAM@KGEOa@k@OQaAuBA?AE]i@CAQ?GAOQ?ACU@KJQFERAB@ROTYfB}CZ_@ROfD{A?A@?ZKPCf@AvCh@R@p@Eh@QXOb@c@JQr@mARm@@QAKWy@o@oAIUWw@[{AKkAGaB?QEqAEWQaAMk@IkAA}ESiAWw@[e@MKKDQ?QIQYA[?GGm@Yu@c@c@QKm@Qa@CSBW?mAZo@?QEQG_@W[e@ISMk@Q{@Wq@]g@c@[i@Q{AUkASk@Gi@Da@N_At@eBtAe@Nc@Ds@??L',
          },
          start_location: {
            lat: -35.238972,
            lng: 149.064026,
          },
          transit_details: {
            arrival_stop: {
              location: {
                lat: -35.176716,
                lng: 149.11351,
              },
              name: 'Amagula Av after Gula Pl',
            },
            arrival_time: {
              text: '08:41',
              time_zone: 'Australia/Sydney',
              value: 1542058860,
            },
            departure_stop: {
              location: {
                lat: -35.238972,
                lng: 149.064026,
              },
              name: 'Westfield Bus Stn',
            },
            departure_time: {
              text: '08:10',
              time_zone: 'Australia/Sydney',
              value: 1542057000,
            },
            headsign: 'City',
            line: {
              agencies: [
                {
                  name: 'Transport Canberra',
                  phone: '011 61 131710',
                  url: 'https://www.transport.act.gov.au/',
                },
              ],
              color: '#0d47a1',
              name: 'Red Rapid City Nicholls & Belconnen',
              short_name: '252',
              text_color: '#ffffff',
              url: 'http://www.transport.act.gov.au/routes-and-timetables/timetables/',
              vehicle: {
                icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
                name: 'Bus',
                type: 'BUS',
              },
            },
            num_stops: 34,
          },
          travel_mode: 'TRANSIT',
        },
        {
          distance: {
            text: '0.2 km',
            value: 209,
          },
          duration: {
            text: '3 mins',
            value: 160,
          },
          end_location: {
            lat: -35.1770033,
            lng: 149.1144793,
          },
          polyline: {
            points:
              'nmuuE{vbm[q@?IGKAM?AC?AA??AA??AA?AAAQAE?ECK@cA?AAA?A?A?A?AAA?AJG?A@?@A@?@A@?@A@?@??A@?@?@?@?@?@A@?@?@?~@?@@@??A@?@?@??A@??ADC@A@?@A@?@?@?T?',
          },
          start_location: {
            lat: -35.176716,
            lng: 149.113581,
          },
          steps: [
            {
              distance: {
                text: '27 m',
                value: 27,
              },
              duration: {
                text: '1 min',
                value: 20,
              },
              end_location: {
                lat: -35.1764742,
                lng: 149.113581,
              },
              polyline: {
                points: 'nmuuE{vbm[q@?',
              },
              start_location: {
                lat: -35.176716,
                lng: 149.113581,
              },
              travel_mode: 'WALKING',
            },
            {
              distance: {
                text: '22 m',
                value: 22,
              },
              duration: {
                text: '1 min',
                value: 21,
              },
              end_location: {
                lat: -35.1762871,
                lng: 149.1136346,
              },
              maneuver: 'turn-slight-right',
              polyline: {
                points: '|kuuE{vbm[IGKAM?',
              },
              start_location: {
                lat: -35.1764742,
                lng: 149.113581,
              },
              travel_mode: 'WALKING',
            },
            {
              distance: {
                text: '66 m',
                value: 66,
              },
              duration: {
                text: '1 min',
                value: 57,
              },
              end_location: {
                lat: -35.1761883,
                lng: 149.1143227,
              },
              maneuver: 'roundabout-left',
              polyline: {
                points: 'xjuuEewbm[AC?AA??AA??AA?AAAQAE?ECK@cA?AAA?A?A?A?AAA?A',
              },
              start_location: {
                lat: -35.1762871,
                lng: 149.1136346,
              },
              travel_mode: 'WALKING',
            },
            {
              distance: {
                text: '94 m',
                value: 94,
              },
              duration: {
                text: '1 min',
                value: 62,
              },
              end_location: {
                lat: -35.1770033,
                lng: 149.1144793,
              },
              maneuver: 'turn-right',
              polyline: {
                points: 'djuuEo{bm[JG?A@?@A@?@A@?@A@?@??A@?@?@?@?@?@A@?@?@?~@?@@@??A@?@?@??A@??ADC@A@?@A@?@?@?T?',
              },
              start_location: {
                lat: -35.1761883,
                lng: 149.1143227,
              },
              travel_mode: 'WALKING',
            },
          ],
          travel_mode: 'WALKING',
        },
      ],
      traffic_speed_entry: [],
      via_waypoint: [],
    },
  ],
  overview_polyline: {
    points:
      'hvavE}lul[a@SQCKA@c@KAJ@?ADeCZoDHiBRgClBqUH{@b@oBiE_DgA{Aa@yAOkABkBnAkId@iC^u@b@c@f@WfAWy@_H_@_DeBuNeDp@AWAi@Pa@h@Wt@_@GSFRZOfAwA~@wB^uAHq@_@oT?CI}EI]AaAW{AGq@Bk@CoGBmK@_CuG_EqC_AiCm@eGgBqC}@eDcByAw@mFgDqDyAm@?WP[j@wAlF{@tBmBpDiCzCiDrCiBlAqIxEeE~BiBlAwA~AcAxA_AlBs@nBg@jBg@O{A[oAAaANw@XkCxA_Bl@eFlBsC`A}@Fw@Eo@My@a@eAiAkEgHu@w@sF_E_BkBs@oAgAkDa@{CEeDNyDgHNiE?a@ImAUiAu@kBqA{Ao@_@{@]]EiF_A_A[cAi@qBaBpBkDx@y@x@g@tHeC@Av@Ur@e@pA}Al@eBLaALeAAa@u@}@cA]mEc@kC]uBi@kBw@?AeAg@kASO@QKm@{@yByAaDiA{Ca@cEMcBQiCq@mAk@uA_A}@y@{@eAyAmBoAaCo@oBSmBOcAKQKGY?o@f@uDzEaa@dh@oAe@gHqCIJK@SxAOZoAjAURMb@M~AEPo@p@wF`H{GhIq@dAAXUTOCKMC[cD}EaAo@aCw@yAkAYa@eAeCSKCc@O{@MeAOyC?cDGgAm@gCSc@OCGWc@s@_@cACIi@iCWoBe@kB[o@M?SYDUVInAgAzAaD`@u@AQLQT@x@g@bA[l@@d@LNHhBjAd@Lh@@j@Ml@_@b@e@`@u@F_AZs@HqADy@Js@Xo@n@m@f@QhCI|AEdAEh@YTEXL`CChAM^UPSv@Gx@{@Ve@^sAHeBKkAYaA_@q@k@k@YQqAy@i@GMKUm@w@cAs@sAQi@iAcDo@eAg@OOKIYuAy@q@Mo@d@u@b@uBrAa@`@eBdC]Tc@JoBF[L]ZSb@YnAUd@YTy@NaC_@oB[Y?e@Nc@ENWJQWGyAKi@e@oBSYWOyEU[OcAyAq@UM@KGg@{@uAmC]i@UAWSCWL]ZGVM|BwDn@o@fD{An@Qf@AvCh@dACbAa@n@u@fA{B?]gAiCa@mAg@gDGsBKiB_@mBIkAA}Ek@aCi@q@]DQIQYAc@Gm@Yu@u@o@oAUk@BmAZo@?QEq@_@e@y@_@gBWq@]g@c@[i@Q{AUkASk@Gi@Da@N_At@eBtAe@NwAD?L?Mq@?UIQEAACCGi@?mAAENKJELAlAAPIV?',
  },
  summary: '',
  warnings: ['Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths.'],
  waypoint_order: [],
};

describe('getMidpoint', () => {
  it('returns the midpoint of a route object', () => {
    expect(getMidpoint(route)).toEqual({ lat: -35.2014674, lng: 149.0942567 });
  });
});
