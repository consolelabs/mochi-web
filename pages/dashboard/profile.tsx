import { useHasMounted } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ReactElement } from 'react'
import Avatar from '~components/Dashboard/Avatar'
import { button } from '~components/Dashboard/Button'
import { card } from '~components/Dashboard/Card'
import { heading } from '~components/Dashboard/Heading'
import DashboardLayout from '~components/Dashboard/Layout'
import { useAccount } from '~hooks/wallets/useAccount'
import { NextPageWithLayout } from '~pages/_app'
import { Sparklines, SparklinesCurve } from 'react-sparklines'

const sampleSparklineData = [
  20014.593981052483, 19927.84901663721, 19952.053930132868, 19966.099406627905,
  19927.031640527064, 19662.44149159682, 19736.70214276614, 20015.141795842756,
  20140.716096819775, 19726.498317449248, 20017.56126117087, 20015.74975034846,
  19998.38051357231, 19873.05651922205, 20014.94794417126, 19978.40357393128,
  20112.688589332083, 20125.326859603574, 20161.423237145915,
  20289.122305747762, 20641.53384712589, 20496.439504448153, 20430.281920284022,
  20354.92119559217, 20422.183524835124, 20320.149386386733, 19997.68589321568,
  20144.278466016294, 20153.915419082572, 20070.351740652604, 20060.5039879907,
  20065.064620294488, 20148.628585917606, 20147.449083421205,
  20109.695014321405, 20099.601274125893, 20213.861350166047, 20420.11198972381,
  20260.380642135693, 20404.807576276766, 20412.131059720636, 20377.60331694696,
  20521.55615175117, 20520.970591146033, 20419.509940034084, 20354.176853327146,
  20378.894553520688, 20395.774231576986, 20385.416893300982,
  20394.706473365226, 20374.722033031314, 20416.506084115634,
  20390.358395002007, 20445.639275555073, 20467.19199163677, 20395.909719893636,
  20433.739452060836, 20359.197913801545, 20380.899515488803, 20588.4348291509,
  20965.374941618255, 21402.332388997627, 21114.52527939293, 21329.194702247583,
  21392.936876282078, 21841.337965967425, 22095.71339833569, 22510.30597574078,
  22443.81619414204, 22288.21692113239, 22291.19910050277, 22279.216985148036,
  22296.13344729077, 22284.490842625077, 22295.9606322532, 22297.295676561986,
  22071.314750764133, 22206.30259462837, 22155.39321703125, 22166.150402447336,
  22603.884076937782, 23639.322487285062, 24164.913413085374,
  24106.255524097673, 24234.74127086627, 24327.361509571547, 24333.878559783203,
  24231.450867008527, 24167.26438467382, 24249.976304181328, 24178.95532797469,
  24249.872857598242, 24375.966818457986, 24340.9638885713, 24468.885171641232,
  24476.451711640875, 24355.226620760808, 24426.386388839936,
  24352.778705048626, 24299.183267935605, 24317.72025578217, 24689.67218633145,
  24863.085907730452, 25641.998775064876, 25745.82629555543, 25939.263045318294,
  25959.192986843434, 25939.679079465554, 25658.310832573265,
  25120.826977244975, 24796.111840298596, 24705.61021665985, 24661.93431300108,
  24712.994794051767, 24758.765085827567, 24688.201986208172, 24997.97860226777,
  25008.25691045825, 24819.898235957266, 24900.991019521523, 24801.70625525999,
  24877.101661287816, 24973.09468982387, 24891.35090336325, 24688.399975881843,
  24675.020105134176, 24890.78824841989, 24895.522671542072, 25018.74040906366,
  24750.833170525402, 24625.39873889541, 24312.453878643257, 24410.609630193478,
  24516.56079337933, 24403.5494659232, 24478.38430466262, 24598.369655875988,
  24557.65441808675, 24470.88205445031, 24375.9295092638, 24475.271950962127,
  24516.218550735783, 24422.63822973852, 24398.165047047198, 24510.30672291863,
  24696.429404530147, 24718.9915517189, 24730.28129747348, 24826.791485966107,
  25115.52971766906, 24994.007310680772, 24879.074051763568, 25014.287139261098,
  25047.200018165368, 25063.232466334084, 24952.901944704994,
  24860.079103376273, 24947.83238849245, 25059.750596956594, 24851.30235343408,
  25103.51118448701, 25116.780421336913, 25166.029424758133, 25076.024083679393,
  25741.588200453516, 25818.189916341948, 25864.00769443923, 25904.928311498516,
]

const Profile: NextPageWithLayout = () => {
  const mounted = useHasMounted()
  const { address } = useAccount()

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center py-2 px-5 pr-2 rounded-xl bg-dashboard-gray-3">
        <div className="p-0.5 w-20 h-20 bg-white rounded-full aspect-square">
          <Avatar className="rounded-full" />
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-sm text-dashboard-gray-8">No ID</span>
          <div className="flex gap-x-2">
            <p className={heading({ size: 'sm' })}>
              {truncate(address ?? '', 10, true, '.')}
            </p>
            <button className={button({ size: 'icon-sm' })}>
              <Icon
                icon="heroicons:chevron-down-20-solid"
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="flex gap-x-1 mt-1">
            <button className={button({ size: 'icon' })}>
              <Icon icon="heroicons:wallet-solid" />
            </button>
            <button className={button({ size: 'icon' })}>
              <Icon icon="ci:external-link" />
            </button>
            <button className={button({ size: 'icon' })}>
              <Icon icon="fluent:qr-code-24-filled" />
            </button>
          </div>
        </div>
        <div className="flex gap-x-2 self-stretch ml-auto w-1/2">
          <div
            className={card({
              className: 'flex-1 flex flex-col justify-between',
            })}
          >
            <span className="text-xs font-semibold uppercase text-dashboard-gray-8">
              wallet
            </span>
            <div className="flex gap-x-1 items-center">
              <Icon
                icon="basil:wallet-solid"
                className="w-6 h-6 text-dashboard-gray-4"
              />
              <span className="text-xl font-semibold text-foreground">
                $12,456
              </span>
            </div>
          </div>

          <div
            className={card({
              className: 'flex-1 flex flex-col justify-between',
            })}
          >
            <span className="text-xs font-semibold uppercase text-dashboard-gray-8">
              protocol
            </span>
            <div className="flex gap-x-1 items-center">
              <Icon icon="cryptocurrency-color:eth" className="w-6 h-6" />
              <span className="text-xl font-semibold text-foreground">ETH</span>
            </div>
          </div>

          <div
            className={card({
              className: 'flex-1 flex flex-col justify-between',
            })}
          >
            <span className="text-xs font-semibold uppercase text-dashboard-gray-8">
              NFTS
            </span>
            <div className="flex gap-x-1 items-center">
              <Icon
                icon="basil:image-solid"
                className="w-6 h-6 text-dashboard-gray-8"
              />
              <span className="text-xl font-semibold text-foreground">26</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-10">
        <div className="flex flex-col flex-shrink-0 flex-[3]">
          <div className="flex justify-between mb-2">
            <p className={heading({ size: 'xs', className: '!font-semibold' })}>
              My Watchlist
            </p>
            <div className="flex gap-x-3 items-center">
              <Link
                href="#"
                className="flex items-center text-foreground-secondary"
              >
                <span className="text-sm font-medium underline">
                  Setup alert bot
                </span>
                <Icon
                  icon="eva:diagonal-arrow-right-up-fill"
                  className="w-5 h-5"
                />
              </Link>
              <Icon
                icon="heroicons:cog-6-tooth-solid"
                className="w-5 h-5 text-foreground"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-5 gap-2 p-2 rounded-xl bg-dashboard-gray-3">
            {Array(10)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={`profile-watchlist-${i}`}
                    className={card({
                      className: 'flex justify-between gwap-x-20',
                    })}
                  >
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-1 items-center">
                        <Icon icon="logos:bitcoin" className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase text-foreground">
                          BTC
                        </span>
                      </div>
                      <div className="flex gap-x-5 items-center">
                        <span className="text-sm font-semibold text-foreground-secondary">
                          $19,842.86
                        </span>
                        <div className="flex gap-x-0.5 items-center text-red-500">
                          <Icon
                            icon="fluent:triangle-down-32-filled"
                            className="w-2 h-2"
                          />
                          <span className="text-xs font-semibold text-red-500">
                            16.19%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Sparklines data={sampleSparklineData}>
                      <SparklinesCurve
                        color="#ff0000"
                        style={{ fill: 'none', strokeWidth: 2 }}
                      />
                    </Sparklines>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="flex flex-1 justify-between mb-2">
            <p className={heading({ size: 'xs', className: '!font-semibold' })}>
              My Quests
            </p>
            <div className="flex gap-x-3 items-center">
              <Link
                href="#"
                className="flex items-center text-foreground-secondary"
              >
                <span className="text-sm font-medium underline">See all</span>
                <Icon
                  icon="eva:diagonal-arrow-right-up-fill"
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col p-2 rounded-xl bg-dashboard-gray-3">
            <div className="flex justify-between p-3">
              <div className="flex flex-col gap-y-1">
                <span className="font-semibold">Ongoing Quests</span>
                <div className="flex gap-x-2 items-center">
                  <div className="py-1 px-2 text-sm font-bold text-white rounded-lg bg-foreground-secondary/50">
                    4/6
                  </div>
                  <span className="font-medium">tasks</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Completed Quests</span>
              </div>
            </div>
            <div className={card({ className: 'flex h-[280px]' })}></div>
            <button className={button({ className: 'mt-2' })}>
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Profile
