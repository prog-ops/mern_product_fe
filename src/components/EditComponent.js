import React, {useEffect, useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {API_URL} from "../const/constants";
import {useNavigate, useParams} from "react-router-dom";

export const EditComponent = () => {
  const [name, setName] = useState('');
  const [buy, setBuy] = useState(0.0);
  const [sell, setSell] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState("");
  const [tampilan, setTampilan] = useState('');
  const nav = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    getProdukById()
  },[])

  const load = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setTampilan(URL.createObjectURL(image))
  }

  const save = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    data.append('name', name)
    data.append('buy_price', buy.toString())
    data.append('sell_price', sell.toString())
    data.append('stock', stock.toString())
    try {
      await axios.patch(API_URL+'/'+id, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      nav('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  const getProdukById = async () => {
    const respon = await axios.get(`${API_URL}/${id}`)
    setName(respon.data.name)
    setBuy(respon.data.buy_price)
    setSell(respon.data.sell_price)
    setStock(respon.data.stock)
    setFile(respon.data.photo)
    setTampilan(respon.data.photo_url)
  }

  return (
      <>
        <Form style={{marginBottom: '100px'}} onSubmit={save}>
          <div className='field'>
            <label className='label'>Nama</label>
            <div className='control'>
              <input type='text' className='input' value={name} onChange={e => setName(e.target.value)}
                     placeholder='Nama produk'/>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Harga Beli</label>
            <div className='control'>
              <input type='number' className='input' value={buy} onChange={e => setBuy(Number(e.target.value))}/>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Harga Jual</label>
            <div className='control'>
              <input type='number' className='input' value={sell} onChange={e => setSell(Number(e.target.value))}/>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Jumlah Stok</label>
            <div className='control'>
              <input type='number' className='input' value={stock} onChange={e => setStock(Number(e.target.value))}/>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Image</label>
            <div className='control'>
              <div className='file'>
                <label className='file-label'>
                  <input type='file' className='file-input' onChange={load}/>
                </label>
              </div>
            </div>
          </div>

          {tampilan
              ? (
                  <figure className='image is-128x128'>
                    <img src={tampilan} alt='Tampilan gambar'/>
                  </figure>
              ) : (
                  ""
              )
          }

          <div className='field'>
            <div className='control'>
              <button type='submit' className='button is-success'>OK</button>
            </div>
          </div>
        </Form>
      </>
  )
}
