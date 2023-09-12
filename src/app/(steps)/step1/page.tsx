'use client'
import Steps from '@/app/components/steps/steps'
import { Button, PageIndicator, Space, Swiper, Toast } from 'antd-mobile'
import { LeftOutline, RightOutline } from 'antd-mobile-icons'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

function Page1() {

  const ref = useRef<SwiperRef>(null)
  const [current, setCurrent] = useState(0);
  const steps = ['step1', 'step2', 'step3', 'step4', 'step5']
  const router = useRouter();

  const items = steps.map((step, index) => (
    <Swiper.Item key={index}>
      <div style={{ background: '#F1F1F1', height: '100%' }} >
        <Steps step={index + 1} />
      </div>
    </Swiper.Item>
  ))


  return (
    <>
      <div className='h-full' >

        <Swiper className='h-full' style={{ height: '100%' }} allowTouchMove={true} ref={ref} loop>
          {items}
        </Swiper>

      </div>

      <div className="fixed w-full bottom-0 h-[100px] p-1 bg-white flex flex-row">
        <div className="basis-2/6 flex items-center justify-center">

          {current != 0 ? (
            <LeftOutline
              className='text-xl'
              onClick={() => {
                ref.current?.swipePrev();
                current === 0 ? setCurrent(4) : setCurrent(current - 1);
              }} />
          ) : ('')}

        </div>
        <div className="basis-2/6 flex items-center justify-center">
          <PageIndicator
            total={5}
            current={current}
            style={{
              '--dot-color': 'rgba(0, 0, 0, 0.4)',
              '--active-dot-color': '#000',
              '--dot-size': '10px',
              '--active-dot-size': '30px',
              '--dot-border-radius': '50%',
              '--active-dot-border-radius': '15px',
              '--dot-spacing': '8px',
            }}
          />
        </div>
        <div className="basis-2/6 flex items-center justify-center">

          {current !== 4 ? (
            <Button
              className="btn-regular"
              onClick={() => {
                ref.current?.swipeNext();
                setCurrent(current => current + 1);
                current === 4 ? setCurrent(0) : setCurrent(current + 1);
              }}
            >
              Next <RightOutline style={{ display: 'inline-block' }} />
            </Button>
          ) : (
            <Button
              className="btn-regular"
              onClick={() => { router.push('/') }}
            >
              Try wiishy
            </Button>
          )}
        </div>
      </div >
    </>
  );
}

export default Page1;