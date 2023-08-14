import Heading from './Heading'
import { sendNReceive, swap, payMe, deposit, airdrop } from '~utils/image'

export default function PayYourFrens() {
  return (
    <section className="mt-12 md:mt-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Heading
          element="h2"
          title="P2P payment platform"
          subtitle="Make sending and receiving money with friends fun and easy. Turn a
          financial transaction into a personal connection."
        />
        <div className="grid md:grid-rows-2 md:grid-flow-col gap-8">
          <div className="row-span-2 bg-home-gray-600 rounded-[22px] overflow-hidden">
            <img
              src={sendNReceive.src}
              alt="Send and receive money"
              className="w-full"
            />
            <div className="p-4">
              <div className="text-base text-[#017AFF] font-medium flex items-center mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-1"
                >
                  <path
                    d="M9.7893 18.3345C14.2327 18.3345 17.9116 14.6476 17.9116 10.2122C17.9116 5.76878 14.2248 2.08984 9.78135 2.08984C5.34593 2.08984 1.66699 5.76878 1.66699 10.2122C1.66699 14.6476 5.35389 18.3345 9.7893 18.3345Z"
                    fill="#017AFF"
                  />
                  <path
                    d="M9.97254 15.3805C9.55049 15.3805 9.42308 15.0461 9.27971 14.5842L8.53917 12.1714C8.45953 11.8529 8.47543 11.7015 8.65863 11.5184L13.3329 6.47779C13.3887 6.41409 13.3887 6.34242 13.3329 6.29464C13.2852 6.26279 13.2214 6.24686 13.1578 6.3026L8.141 11.0088C7.94193 11.184 7.78267 11.184 7.48804 11.0964L5.00356 10.3478C4.55763 10.2125 4.24707 10.0691 4.24707 9.65505C4.24707 9.3206 4.5417 9.08175 4.92393 8.94632L12.8153 5.92038C13.0304 5.84075 13.2055 5.79297 13.3647 5.79297C13.6594 5.79297 13.8346 5.97612 13.8346 6.27076C13.8346 6.43001 13.7948 6.6052 13.7152 6.8202L10.7131 14.6718C10.5458 15.1097 10.3069 15.3805 9.97254 15.3805Z"
                    fill="white"
                  />
                </svg>
                Send & Receive
              </div>
              <div className="text-sm font-normal text-home-gray-700">
                All-in-one, user-friendly for people of all experience levels.
              </div>
            </div>
          </div>
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden p-4 flex flex-col">
            <img src={swap.src} alt="Swap" className="w-full" />
            <div className="mt-auto">
              <div className="text-base text-[#A259FF] font-medium flex items-center mb-2">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  className="mr-1"
                >
                  <path
                    d="M9.99621 18.8264C14.5528 18.8264 18.3254 15.0456 18.3254 10.4972C18.3254 5.94062 14.5447 2.16797 9.98806 2.16797C5.43965 2.16797 1.66699 5.94062 1.66699 10.4972C1.66699 15.0456 5.44781 18.8264 9.99621 18.8264Z"
                    fill="#A259FF"
                  />
                  <path
                    d="M4.7207 9.7297C4.7207 8.30063 5.74145 7.36972 7.3093 7.36972H10.5266V6.32448C10.5266 6.04684 10.7064 5.86719 10.984 5.86719C11.0983 5.86719 11.2371 5.91619 11.3351 5.99784L13.2378 7.5902C13.4746 7.78618 13.4746 8.08832 13.2378 8.2843L11.3351 9.86851C11.2371 9.95017 11.0983 9.99101 10.984 9.99101C10.7064 9.99101 10.5266 9.81952 10.5266 9.52553V8.48845H7.21948C6.40289 8.48845 5.8476 9.0029 5.8476 9.78684V10.2523C5.8476 10.5545 5.60263 10.8075 5.27599 10.8075C4.97385 10.8075 4.7207 10.5545 4.7207 10.2523V9.7297ZM15.2793 11.2893C15.2793 12.7265 14.2585 13.6575 12.6906 13.6575H9.47325V14.7027C9.47325 14.9885 9.30176 15.1681 9.016 15.1681C8.90165 15.1681 8.77099 15.1192 8.67302 15.0376L6.76219 13.4452C6.52538 13.2492 6.52538 12.9389 6.76219 12.7429L8.67302 11.1669C8.76284 11.0934 8.90165 11.0444 9.016 11.0444C9.30176 11.0444 9.47325 11.2159 9.47325 11.5017V12.5387H12.7805C13.5971 12.5387 14.1524 12.0243 14.1524 11.2322V10.7749C14.1524 10.4564 14.3891 10.2196 14.724 10.2196C15.0424 10.2196 15.2793 10.4564 15.2793 10.7749V11.2893Z"
                    fill="white"
                  />
                </svg>
                Swap
              </div>
              <div className="text-sm font-normal text-home-gray-700">
                Enable trading for thousands of tokens with minimal fees, 24/7.
              </div>
            </div>
          </div>
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden p-4 flex flex-col">
            <img src={payMe.src} alt="Pay Me" className="w-full" />
            <div className="mt-auto">
              <div className="text-base text-[#EB459F] font-medium flex items-center mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.62793 9.97561C1.62793 7.65865 2.60642 5.54077 4.16764 4.01989V8.72182C4.1677 8.8168 4.1957 8.90984 4.24842 8.99021C4.30114 9.07058 4.37643 9.13503 4.46563 9.17613C4.55482 9.21723 4.65429 9.23332 4.75259 9.22253C4.85089 9.21174 4.94402 9.17453 5.02125 9.11517L6.00618 8.35874L6.99111 9.11567C7.09208 9.19321 7.21929 9.23227 7.34839 9.22539C7.47749 9.2185 7.59941 9.16615 7.69081 9.07835L8.37002 8.42631L9.04923 9.07835C9.1407 9.16608 9.26265 9.21834 9.39175 9.22513C9.52085 9.23192 9.64802 9.19277 9.74893 9.11517L10.7339 8.35874L11.7188 9.11517C11.796 9.17453 11.8892 9.21174 11.9874 9.22253C12.0857 9.23332 12.1852 9.21723 12.2744 9.17613C12.3636 9.13503 12.4389 9.07058 12.4916 8.99021C12.5443 8.90984 12.5723 8.8168 12.5724 8.72182V2.72754C12.5724 2.47545 12.5069 2.22984 12.3848 2.01172C15.7822 3.0684 18.2945 6.26698 18.2945 9.97561C18.2945 12.206 17.3911 14.2487 15.9343 15.7534V11.687C15.9342 11.592 15.9062 11.499 15.8535 11.4186C15.8008 11.3383 15.7255 11.2738 15.6363 11.2327C15.5471 11.1916 15.4477 11.1755 15.3494 11.1863C15.2511 11.1971 15.1579 11.2343 15.0807 11.2937L14.0958 12.0501L13.1108 11.2937C13.0099 11.2161 12.8828 11.1769 12.7537 11.1837C12.6246 11.1905 12.5026 11.2428 12.4111 11.3305L11.7319 11.9825L11.0527 11.3305C10.9613 11.2427 10.8394 11.1903 10.7103 11.1835C10.5812 11.1766 10.454 11.2156 10.353 11.2932L9.36809 12.0501L8.38316 11.2937C8.30593 11.2343 8.2128 11.1971 8.1145 11.1863C8.0162 11.1755 7.91673 11.1916 7.82754 11.2327C7.73834 11.2738 7.66305 11.3383 7.61033 11.4186C7.55762 11.499 7.52961 11.592 7.52955 11.687V17.6813C7.52955 17.7709 7.53783 17.8597 7.55398 17.9467C4.15056 16.8984 1.62793 13.6985 1.62793 9.97561ZM8.37002 5.41704H6.79413C6.65481 5.41704 6.5212 5.47017 6.42269 5.56475C6.32417 5.65932 6.26883 5.78758 6.26883 5.92133C6.26883 6.05507 6.32417 6.18334 6.42269 6.27791C6.5212 6.37248 6.65481 6.42561 6.79413 6.42561H8.37002C8.50934 6.42561 8.64295 6.37248 8.74146 6.27791C8.83997 6.18334 8.89532 6.05507 8.89532 5.92133C8.89532 5.78758 8.83997 5.65932 8.74146 5.56475C8.64295 5.47017 8.50934 5.41704 8.37002 5.41704ZM9.94591 3.39991H6.79413C6.66024 3.40006 6.53146 3.44927 6.43411 3.53751C6.33675 3.62574 6.27816 3.74633 6.27032 3.87464C6.26247 4.00295 6.30596 4.1293 6.39189 4.22786C6.47782 4.32642 6.59972 4.38977 6.73267 4.40495L6.79413 4.40848H9.94591C10.0798 4.40834 10.2086 4.35912 10.3059 4.27089C10.4033 4.18265 10.4619 4.06206 10.4697 3.93375C10.4776 3.80544 10.4341 3.67909 10.3482 3.58053C10.2622 3.48197 10.1403 3.41862 10.0074 3.40344L9.94591 3.39991ZM10.156 14.9918H11.7319C11.8712 14.9918 12.0049 14.9387 12.1034 14.8441C12.2019 14.7495 12.2572 14.6213 12.2572 14.4875C12.2572 14.3538 12.2019 14.2255 12.1034 14.1309C12.0049 14.0364 11.8712 13.9832 11.7319 13.9832H10.156C10.0167 13.9832 9.88311 14.0364 9.7846 14.1309C9.68609 14.2255 9.63074 14.3538 9.63074 14.4875C9.63074 14.6213 9.68609 14.7495 9.7846 14.8441C9.88311 14.9387 10.0167 14.9918 10.156 14.9918ZM9.79602 16.8713C9.89337 16.9596 10.0222 17.0088 10.156 17.0089H13.3078L13.3693 17.0054C13.5022 16.9902 13.6241 16.9269 13.7101 16.8283C13.796 16.7297 13.8395 16.6034 13.8316 16.4751C13.8238 16.3468 13.7652 16.2262 13.6678 16.138C13.5705 16.0497 13.4417 16.0005 13.3078 16.0004H10.156L10.0946 16.0039C9.96163 16.0191 9.83973 16.0824 9.7538 16.181C9.66787 16.2795 9.62438 16.4059 9.63223 16.5342C9.64007 16.6625 9.69866 16.7831 9.79602 16.8713Z"
                    fill="#EB459F"
                  />
                </svg>
                Pay Me
              </div>
              <div className="text-sm font-normal text-home-gray-700">
                Your friends can pay you with just a few clicks, Mochi makes it
                easy!
              </div>
            </div>
          </div>
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden p-4 flex flex-col">
            <img src={airdrop.src} alt="airdrop" className="w-full" />
            <div className="mt-auto">
              <div className="text-base text-[#15A55A] font-medium flex items-center mb-2">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M9.96124 18.8112C14.5201 18.8112 18.2945 15.0367 18.2945 10.4778C18.2945 5.92721 14.5119 2.14453 9.95308 2.14453C5.40243 2.14453 1.62793 5.92721 1.62793 10.4778C1.62793 15.0367 5.41061 18.8112 9.96124 18.8112Z"
                    fill="#15A55A"
                  />
                  <path
                    d="M14.7416 10.1171L10.0076 16.3333L5.26336 10.1222L5.30967 10.081C5.41773 9.97262 5.54637 9.88492 5.67501 9.8127L9.35412 14.6258L8.24781 11.1746L8.58742 10.5607L10.0076 14.9817L11.4124 10.5556L11.7571 11.1746L10.6611 14.6258L14.3351 9.80754C14.4637 9.88492 14.5872 9.95714 14.6901 10.0655L14.7416 10.1171ZM6.40569 9.11111C7.17753 9.11111 7.8516 9.55476 8.20665 10.1944C8.38088 9.86732 8.64044 9.59376 8.95762 9.40297C9.27481 9.21217 9.63771 9.1113 10.0076 9.11111C10.7795 9.11111 11.4484 9.5496 11.8086 10.1893C11.9817 9.86165 12.2412 9.58789 12.5587 9.39779C12.8762 9.20769 13.2397 9.10854 13.6095 9.11111C14.1704 9.11111 14.685 9.32778 15.0554 9.69921C14.6078 7.30556 12.5187 5.5 10.0076 5.5C7.48112 5.5 5.392 7.30556 4.94434 9.71468C5.31997 9.34325 5.83453 9.11111 6.40569 9.11111Z"
                    fill="white"
                  />
                </svg>
                Airdrop
              </div>
              <div className="text-sm font-normal text-home-gray-700">
                Give away your cash. Make your friends feel fun and special.
              </div>
            </div>
          </div>
          <div className="bg-home-gray-600 rounded-[22px] overflow-hidden p-4 flex flex-col">
            <img src={deposit.src} alt="deposit" className="w-full" />
            <div className="mt-auto">
              <div className="text-base text-[#333333] font-medium flex items-center mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M10.0085 13.0264C8.3255 13.0264 6.97746 11.6709 6.97746 9.99684C6.97746 8.32284 8.3255 6.9673 10.0085 6.9673C11.6834 6.9673 13.0314 8.32284 13.0314 9.99684C13.0314 11.6709 11.6834 13.0264 10.0085 13.0264ZM4.39575 5.90573C4.81242 5.31778 5.31079 4.8115 5.89085 4.39503L7.50851 6.01189C6.9121 6.39569 6.38106 6.91014 6.00524 7.51441L4.39575 5.90573ZM15.6049 5.91389L13.9873 7.52258C13.6196 6.91831 13.0886 6.40385 12.4921 6.02005L14.1099 4.4032C14.6899 4.81966 15.1882 5.33411 15.6049 5.91389ZM15.6049 14.0635C15.1964 14.6433 14.6899 15.1577 14.118 15.5742L12.4921 13.9573C13.0967 13.5735 13.6196 13.0591 13.9955 12.4548L15.6049 14.0635ZM4.40393 14.0717L6.01341 12.463C6.38923 13.0673 6.9121 13.5817 7.50851 13.9655L5.89085 15.5824C5.31896 15.1659 4.81242 14.6596 4.40393 14.0717ZM10.0003 18.3343C14.5592 18.3343 18.3337 14.5616 18.3337 10.005C18.3337 5.4566 14.551 1.67578 9.99217 1.67578C5.44151 1.67578 1.66699 5.4566 1.66699 10.005C1.66699 14.5616 5.44968 18.3343 10.0003 18.3343Z"
                    fill="#333333"
                  />
                </svg>
                Deposit
              </div>
              <div className="text-sm font-normal text-home-gray-700">
                Organize your finances by creating a savings vault for each
                financial goal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
