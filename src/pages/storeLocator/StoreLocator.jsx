import {Boilerplate} from '..';

function StoreLocator() {
  const navigateTo = (url) => {
    window.open(url, '_blank');
  }
  return (
    <Boilerplate>
      <div className="flex gap-5 justify-center items-center">
        <div className='rounded-lg p-5 shadow-lg ring-1  ring-offset-yellow-400 bg-slate-200 md:flex gap-5'>
          <div className=''>
              <h1 className='lg:text-2xl cursor-pointer text-yellow-500'  onClick={()=>navigateTo('https://maps.app.goo.gl/j6DPYwQtLfxvF8cKA') }>NMP Polymer LLC.</h1>
              <p>House: 1, Road: 1, Block: A, Kamrangirchar, Lalbag,</p>
              <p>Dhaka 1211, Bangladesh</p>
          </div>
          <div>
          <iframe className='min-h-96 md:w-[600px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.075558770261!2d90.3715841481899!3d23.7165267814844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf002a57a949%3A0xd5180a88fb2bfe09!2sPathao%20Couriar%20Booking%20Point!5e0!3m2!1sbn!2sbd!4v1736784942930!5m2!1sbn!2sbd" style={{border:'0px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </Boilerplate>
  )
}

export default StoreLocator;