import axios from "axios";
import { User } from "@/types/user/user";
import styles from "@/styles/page/profile.module.scss";
import {Memory} from "@/types/memory/memory";
import dayjs from "dayjs";

interface Props {
    params: {
        id: string;
    };
}

export default async function Profile({ params }: Props) {
    const { id } = params;
    let user: User | null = null;

    try {
        const res = await axios.get(`http://localhost:3000/api/users/${id}`);
        user = res.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.container__info}>
                    <img src={user?.avatarUrl} alt={`${user?.firstName} ${user?.lastName} avatar`} className={styles.avatar} />
                    <div className={styles.context}>
                        <h1 className={styles.context__name}>{user?.firstName} {user?.lastName}</h1>
                        {user?.bio && (
                            <div className={styles.context__bio}>
                                <h4 className={styles.bio__title}>Short bio</h4>
                                <p className={styles.bio__text}>{user?.bio}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.container__memories}>
                    <div className={styles.memories}>
                        <h2 className={styles.memories__title}>Recent memories:</h2>
                        <div className={styles.memories__list}>
                            {user?.memories && user.memories.map((memory: Memory, index: number) => (
                                <div className={styles.memory} key={index}>
                                    <h4 className={styles.memory__location}>{memory.city}, {memory.country}</h4>
                                    <h3 className={styles.memory__title}>{memory.title}</h3>
                                    <p className={styles.memory__category}>{memory.categoryName}</p>
                                    <p className={styles.memory__description}>{memory.description}</p>
                                    <div className={styles.selector}>
                                        <span className={styles.memory__likes}>Likes: {memory.likeCount}</span>
                                        <span className={styles.memory__createdAt}>{dayjs(memory.createdAt).format("DD.MM.YYYY")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.memories}>
                        <h2 className={styles.memories__title}>Most popular memories:</h2>
                        <div className={styles.memories__list}>
                            {user?.memories && user.memories.map((memory: Memory, index: number) => (
                                <div className={styles.memory} key={index}>
                                    <h4 className={styles.memory__location}>{memory.city}, {memory.country}</h4>
                                    <h3 className={styles.memory__title}>{memory.title}</h3>
                                    <p className={styles.memory__category}>{memory.categoryName}</p>
                                    <p className={styles.memory__description}>{memory.description}</p>
                                    <div className={styles.selector}>
                                        <span className={styles.memory__likes}>Likes: {memory.likeCount}</span>
                                        <span className={styles.memory__createdAt}>{dayjs(memory.createdAt).format("DD.MM.YYYY")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}