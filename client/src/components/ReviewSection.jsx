/*
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const user = useSelector(state => state.user);

    const fetchReviews = async () => {
    try {
      const res = await Axios({
        url: `/api/review/product/${productId}`,
        method: "get",
      });
      console.log("REVIEWS RESPONSE:", res.data); // <-- adiciona isso
      if (res.data.success) {
        setReviews(res.data.data);
        setAverage(res.data.average);
      }
    } catch (err) {
      console.log("ERRO AO BUSCAR REVIEWS:", err.response?.data || err.message); // <-- e isso
    }
  };
/*
  const fetchReviews = async () => {
    try {
      const res = await Axios({
        url: `/api/review/product/${productId}`,
        method: "get",
      });
      if (res.data.success) {
        setReviews(res.data.data);
        setAverage(res.data.average);
      }
    } catch {}
  }; */
 /*
  useEffect(() => { if (productId) fetchReviews(); }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("Faça login para avaliar");
    try {
      const res = await Axios({
      ...SummaryApi.createReview,
        data: { productId, rating, comment },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setComment("");
        fetchReviews();
      }
    } catch (err) { toast.error("Erro ao enviar avaliação"); }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold text-lg">Avaliações dos clientes</h3>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex text-yellow-400 text-xl">
          {[1,2,3,4,5].map(n => (
            <FaStar key={n} className={n <= Math.round(average)? "text-yellow-400" : "text-gray-300"} />
          ))}
        </div>
        <span className="font-bold">{average.toFixed(1)} / 5</span>
        <span className="text-gray-500 text-sm">({reviews.length} avaliações)</span>
      </div>

      {user?._id && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mt-4 space-y-3">
          <p className="font-semibold">Deixe sua avaliação</p>
          <div className="flex gap-1 text-2xl cursor-pointer">
            {[1,2,3,4,5].map(n => (
              <FaStar key={n}
                className={n <= (hover || rating)? "text-yellow-400" : "text-gray-300"}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Como foi sua experiência com esse produto?"
            className="w-full border rounded p-2 text-sm"
            rows={3}
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Enviar avaliação</button>
        </form>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white border rounded p-3">
            <div className="flex justify-between">
              <p className="font-semibold text-sm">{r.userId?.name || "Cliente"}</p>
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(n => <FaStar key={n} size={14} className={n <= r.rating? "text-yellow-400" : "text-gray-300"} />)}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
            <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>}
      </div>
    </div>
  );
};

export default ReviewSection; */
/*
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const user = useSelector(state => state.user);

  const fetchReviews = async () => {
    try {
      const res = await Axios({
        url: `/api/review/product/${productId}`,
        method: "get",
      });
      if (res.data.success) {
        setReviews(res.data.data);
        setAverage(res.data.average);
      }
    } catch (err) {
      console.log("ERRO AO BUSCAR REVIEWS:", err.response?.data || err.message);
    }
  };

  useEffect(() => { if (productId) fetchReviews(); }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("Faça login para avaliar");
    try {
      const res = await Axios({
       ...SummaryApi.createReview,
        data: { productId, rating, comment },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setComment("");
        fetchReviews();
      }
    } catch (err) { toast.error("Erro ao enviar avaliação"); }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold text-lg">Avaliações dos clientes</h3>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex text-yellow-400 text-xl">
          {[1,2,3,4,5].map(n => (
            <FaStar key={n} className={n <= Math.round(average)? "text-yellow-400" : "text-gray-300"} />
          ))}
        </div>
        <span className="font-bold">{average.toFixed(1)} / 5</span>
        <span className="text-gray-500 text-sm">({reviews.length} avaliações)</span>
      </div>

      {user?._id && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mt-4 space-y-3">
          <p className="font-semibold">Deixe sua avaliação</p>
          <div className="flex gap-1 text-2xl cursor-pointer">
            {[1,2,3,4,5].map(n => (
              <FaStar key={n}
                className={n <= (hover || rating)? "text-yellow-400" : "text-gray-300"}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Como foi sua experiência com esse produto?"
            className="w-full border rounded p-2 text-sm"
            rows={3}
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Enviar avaliação</button>
        </form>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white border rounded p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {r.userId?.avatar? (
                  <img src={r.userId.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                    {r.userId?.name?.charAt(0).toUpperCase() || "C"}
                  </div>
                )}
                <p className="font-semibold text-sm">{r.userId?.name || "Cliente"}</p>
              </div>
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(n => <FaStar key={n} size={14} className={n <= r.rating? "text-yellow-400" : "text-gray-300"} />)}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
            <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>}
      </div>
    </div>
  );
};

export default ReviewSection; */
/*
import { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const user = useSelector(state => state.user);

  const fetchReviews = async () => {
    try {
      const res = await Axios({ url: `/api/review/product/${productId}`, method: "get" });
      if (res.data.success) { setReviews(res.data.data); setAverage(res.data.average); }
    } catch (err) { console.log("ERRO:", err.response?.data); }
  };

  useEffect(() => { if (productId) fetchReviews(); }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("Faça login para avaliar");
    try {
      const res = await Axios({ ...SummaryApi.createReview, data: { productId, rating, comment } });
      if (res.data.success) { toast.success(res.data.message); setComment(""); fetchReviews(); }
    } catch { toast.error("Erro ao enviar avaliação"); }
  };

  const handleEdit = (r) => {
    setEditingId(r._id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "put", data: { rating: editRating, comment: editComment } });
      if (res.data.success) { toast.success(res.data.message); setEditingId(null); fetchReviews(); }
    } catch { toast.error("Erro ao editar"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir sua avaliação?")) return;
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "delete" });
      if (res.data.success) { toast.success(res.data.message); fetchReviews(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold text-lg">Avaliações dos clientes</h3>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex text-yellow-400 text-xl">
          {[1,2,3,4,5].map(n => <FaStar key={n} className={n <= Math.round(average) ? "text-yellow-400" : "text-gray-300"} />)}
        </div>
        <span className="font-bold">{average.toFixed(1)} / 5</span>
        <span className="text-gray-500 text-sm">({reviews.length} avaliações)</span>
      </div>

      {user?._id && !reviews.some(r => r.userId._id === user._id) && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mt-4 space-y-3">
          <p className="font-semibold">Deixe sua avaliação</p>
          <div className="flex gap-1 text-2xl cursor-pointer">
            {[1,2,3,4,5].map(n => <FaStar key={n} className={n <= (hover || rating) ? "text-yellow-400" : "text-gray-300"} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} />)}
          </div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Como foi sua experiência?" className="w-full border rounded p-2 text-sm" rows={3} required />
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Enviar avaliação</button>
        </form>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white border rounded p-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {r.userId?.avatar ? <img src={r.userId.avatar} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">{r.userId?.name?.charAt(0).toUpperCase() || "C"}</div>}
                <div>
                  <p className="font-semibold text-sm">{r.userId?.name || "Cliente"}</p>
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(n => <FaStar key={n} size={12} className={n <= r.rating ? "text-yellow-400" : "text-gray-300"} />)}</div>
                </div>
              </div>

              {r.userId._id === user?._id && (
                <div className="flex gap-2 text-sm">
                  <button onClick={() => handleEdit(r)} className="text-blue-600 flex items-center gap-1"><FaEdit /> Editar</button>
                  <button onClick={() => handleDelete(r._id)} className="text-red-600 flex items-center gap-1"><FaTrash /> Excluir</button>
                </div>
              )}
            </div>

            {editingId === r._id ? (
              <div className="mt-3 space-y-2">
                <div className="flex gap-1 text-xl cursor-pointer">
                  {[1,2,3,4,5].map(n => <FaStar key={n} className={n <= editRating ? "text-yellow-400" : "text-gray-300"} onClick={() => setEditRating(n)} />)}
                </div>
                <textarea value={editComment} onChange={e => setEditComment(e.target.value)} className="w-full border rounded p-2 text-sm" rows={3} />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(r._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-200 px-3 py-1 rounded text-sm">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 mt-2">{r.comment}</p>
                <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
              </>
            )}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>}
      </div>
    </div>
  );
};

export default ReviewSection; */
/*
import { useState, useEffect, useRef } from "react";
import { FaStar, FaEllipsisV, FaEdit, FaTrash, FaBookmark } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("savedReviews") || "[]"));
  const menuRef = useRef(null);
  const user = useSelector(state => state.user);
  const isAdmin = user?.role === "ADMIN";

  const fetchReviews = async () => {
    try {
      const res = await Axios({ url: `/api/review/product/${productId}`, method: "get" });
      if (res.data.success) { setReviews(res.data.data); setAverage(res.data.average); }
    } catch (err) { console.log(err.response?.data); }
  };

  useEffect(() => { if (productId) fetchReviews(); }, [productId]);

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("Faça login para avaliar");
    try {
      const res = await Axios({ ...SummaryApi.createReview, data: { productId, rating, comment } });
      if (res.data.success) { toast.success(res.data.message); setComment(""); fetchReviews(); }
    } catch { toast.error("Erro ao enviar"); }
  };

  const handleEdit = (r) => { setEditingId(r._id); setEditRating(r.rating); setEditComment(r.comment); setOpenMenuId(null); };

  const handleUpdate = async (id) => {
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "put", data: { rating: editRating, comment: editComment } });
      if (res.data.success) { toast.success(res.data.message); setEditingId(null); fetchReviews(); }
    } catch { toast.error("Erro ao editar"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir esta avaliação?")) return;
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "delete" });
      if (res.data.success) { toast.success(res.data.message); setOpenMenuId(null); fetchReviews(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  const handleSave = (id) => {
    let newSaved = saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id];
    setSaved(newSaved);
    localStorage.setItem("savedReviews", JSON.stringify(newSaved));
    toast.success(saved.includes(id) ? "Removido dos salvos" : "Avaliação salva!");
    setOpenMenuId(null);
  };

  const canEdit = (r) => r.userId._id === user?._id || isAdmin;

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold text-lg">Avaliações dos clientes</h3>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex text-yellow-400 text-xl">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= Math.round(average) ? "text-yellow-400" : "text-gray-300"} />)}</div>
        <span className="font-bold">{average.toFixed(1)} / 5</span>
        <span className="text-gray-500 text-sm">({reviews.length} avaliações)</span>
      </div>

      {user?._id && !reviews.some(r => r.userId._id === user._id) && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mt-4 space-y-3">
          <p className="font-semibold">Deixe sua avaliação</p>
          <div className="flex gap-1 text-2xl cursor-pointer">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= (hover || rating) ? "text-yellow-400" : "text-gray-300"} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} />)}</div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Como foi sua experiência?" className="w-full border rounded p-2 text-sm" rows={3} required />
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Enviar avaliação</button>
        </form>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map(r => (
          <div key={r._id} id={`review-${r._id}`} className="bg-white border rounded p-3 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {r.userId?.avatar ? <img src={r.userId.avatar} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">{r.userId?.name?.charAt(0).toUpperCase() || "C"}</div>}
                <div>
                  <p className="font-semibold text-sm">{r.userId?.name || "Cliente"} {saved.includes(r._id) && <span className="text-xs bg-yellow-100 text-yellow-700 px-1 rounded">Salvo</span>}</p>
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(n => <FaStar key={n} size={12} className={n <= r.rating ? "text-yellow-400" : "text-gray-300"} />)}</div>
                </div>
              </div>

              {canEdit(r) && (
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setOpenMenuId(openMenuId === r._id ? null : r._id)} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaEllipsisV className="text-gray-500" />
                  </button>
                  {openMenuId === r._id && (
                    <div className="absolute right-0 top-8 w-44 bg-white border rounded-xl shadow-lg z-20 py-2">
                      <button onClick={() => handleEdit(r)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"><FaEdit /> Editar</button>
                      <button onClick={() => handleDelete(r._id)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm text-red-600"><FaTrash /> Excluir</button>
                      <button onClick={() => handleSave(r._id)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"><FaBookmark /> {saved.includes(r._id) ? "Desfazer Salvar" : "Salvar"}</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {editingId === r._id ? (
              <div className="mt-3 space-y-2">
                <div className="flex gap-1 text-xl cursor-pointer">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= editRating ? "text-yellow-400" : "text-gray-300"} onClick={() => setEditRating(n)} />)}</div>
                <textarea value={editComment} onChange={e => setEditComment(e.target.value)} className="w-full border rounded p-2 text-sm" rows={3} />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(r._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-200 px-3 py-1 rounded text-sm">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 mt-2">{r.comment}</p>
                <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
              </>
            )}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-sm">Nenhuma avaliação ainda.</p>}
      </div>
    </div>
  );
};

export default ReviewSection; */
import { useState, useEffect, useRef } from "react";
import { FaStar, FaEllipsisV, FaEdit, FaTrash, FaBookmark, FaThumbsUp } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("savedReviews") || "[]"));
  const menuRef = useRef(null);

  const userState = useSelector(state => state.user);
  const user = userState?.user || userState;
  const isAdmin = user?.role === "ADMIN";

  const fetchReviews = async () => {
    try {
      const res = await Axios({ url: `/api/review/product/${productId}`, method: "get" });
      if (res.data.success) { setReviews(res.data.data); setAverage(res.data.average); }
    } catch (err) { console.log(err.response?.data); }
  };

  useEffect(() => { if (productId) fetchReviews(); }, [productId]);

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return toast.error("Faça login para avaliar");
    try {
      const res = await Axios({ ...SummaryApi.createReview, data: { productId, rating, comment } });
      if (res.data.success) { toast.success(res.data.message); setComment(""); fetchReviews(); }
    } catch { toast.error("Erro ao enviar"); }
  };

  const handleEdit = (r) => { setEditingId(r._id); setEditRating(r.rating); setEditComment(r.comment); setOpenMenuId(null); };

  const handleUpdate = async (id) => {
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "put", data: { rating: editRating, comment: editComment } });
      if (res.data.success) { toast.success(res.data.message); setEditingId(null); fetchReviews(); }
    } catch { toast.error("Erro ao editar"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir esta avaliação?")) return;
    try {
      const res = await Axios({ url: `/api/review/${id}`, method: "delete" });
      if (res.data.success) { toast.success(res.data.message); setOpenMenuId(null); fetchReviews(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  const handleSave = (id) => {
    let newSaved = saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id];
    setSaved(newSaved);
    localStorage.setItem("savedReviews", JSON.stringify(newSaved));
    toast.success(saved.includes(id) ? "Removido dos salvos" : "Avaliação salva!");
    setOpenMenuId(null);
  };

  const handleHelpful = async (id) => {
    if (!user?._id) return toast.error("Faça login para marcar como útil");
    try {
      const res = await Axios({ url: `/api/review/${id}/helpful`, method: "post" });
      if (res.data.success) fetchReviews();
    } catch { toast.error("Erro"); }
  };

  const isOwner = (r) => {
    const reviewUserId = r.userId?._id ? r.userId._id.toString() : r.userId?.toString();
    return reviewUserId === user?._id?.toString();
  };

  const canEditOrDelete = (r) => isOwner(r) || isAdmin;

  const hasHelpful = (r) => r.helpfulBy?.some(u => u.toString() === user?._id?.toString());

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="font-semibold text-lg">Avaliações dos clientes</h3>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex text-yellow-400 text-xl">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= Math.round(average) ? "text-yellow-400" : "text-gray-300"} />)}</div>
        <span className="font-bold">{average.toFixed(1)} / 5</span>
        <span className="text-gray-500 text-sm">({reviews.length} avaliações)</span>
      </div>

      {user?._id && !reviews.some(r => isOwner(r)) && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mt-4 space-y-3">
          <p className="font-semibold">Deixe sua avaliação</p>
          <div className="flex gap-1 text-2xl cursor-pointer">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= (hover || rating) ? "text-yellow-400" : "text-gray-300"} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} />)}</div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Como foi sua experiência?" className="w-full border rounded p-2 text-sm" rows={3} required />
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Enviar avaliação</button>
        </form>
      )}

      <div className="space-y-3 mt-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white border rounded p-3 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {r.userId?.avatar ? <img src={r.userId.avatar} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">{r.userId?.name?.charAt(0).toUpperCase() || "C"}</div>}
                <div>
                  <p className="font-semibold text-sm">{r.userId?.name || "Cliente"} {saved.includes(r._id) && <span className="text-xs bg-yellow-100 text-yellow-700 px-1 rounded">Salvo</span>}</p>
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(n => <FaStar key={n} size={12} className={n <= r.rating ? "text-yellow-400" : "text-gray-300"} />)}</div>
                </div>
              </div>
              {user?._id && (
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setOpenMenuId(openMenuId === r._id ? null : r._id)} className="p-2 hover:bg-gray-100 rounded-full"><FaEllipsisV className="text-gray-500" /></button>
                  {openMenuId === r._id && (
                    <div className="absolute right-0 top-8 w-44 bg-white border rounded-xl shadow-lg z-20 py-2">
                      {canEditOrDelete(r) && (
                        <>
                          <button onClick={() => handleEdit(r)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"><FaEdit /> Editar</button>
                          <button onClick={() => handleDelete(r._id)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm text-red-600"><FaTrash /> Excluir</button>
                        </>
                      )}
                      <button onClick={() => handleSave(r._id)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"><FaBookmark /> {saved.includes(r._id) ? "Desfazer Salvar" : "Salvar"}</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {editingId === r._id ? (
              <div className="mt-3 space-y-2">
                <div className="flex gap-1 text-xl cursor-pointer">{[1,2,3,4,5].map(n => <FaStar key={n} className={n <= editRating ? "text-yellow-400" : "text-gray-300"} onClick={() => setEditRating(n)} />)}</div>
                <textarea value={editComment} onChange={e => setEditComment(e.target.value)} className="w-full border rounded p-2 text-sm" rows={3} />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(r._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-200 px-3 py-1 rounded text-sm">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 mt-2">{r.comment}</p>
                <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleHelpful(r._id)} className={`flex items-center gap-1.5 text-xs border rounded-full px-3 py-1.5 transition ${hasHelpful(r) ? "bg-blue-100 text-blue-700 border-blue-300 font-semibold" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                    <FaThumbsUp size={12} /> Foi útil? ({r.helpful || 0})
                  </button>
                  {r.helpful > 0 && <span className="text-xs text-gray-500">{r.helpful} pessoa{r.helpful > 1 ? "s" : ""} achou útil</span>}
                </div>
              </>
            )}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-sm">Nenhuma avaliação ainda.</p>}
      </div>
    </div>
  );
};

export default ReviewSection;